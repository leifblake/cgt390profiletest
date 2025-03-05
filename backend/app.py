from flask import Flask, request, jsonify, url_for
from pymongo import MongoClient
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allow all origins for API routes

# Connect to MongoDB (replace 'profiles_db' with your database name if desired)
import os
MONGODB_URI = os.environ.get("MONGODB_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGODB_URI)
db = client['profiles_db']
profiles_collection = db['profiles']

# Configure the folder for file uploads
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static/uploads')
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route("/api/profiles", methods=["GET", "POST"])
def api_profiles():
    if request.method == "POST":
        # Retrieve form data
        name = request.form.get("name")
        email = request.form.get("email")
        role = request.form.get("role")
        bio = request.form.get("bio")
        image_file = request.files.get("image")

        # Validate required fields
        if not all([name, email, role, bio]):
            return jsonify({"success": False, "message": "All fields are required."}), 400

        # Save the image if provided
        filename = None
        if image_file and image_file.filename != "":
            filename = secure_filename(image_file.filename)
            image_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        # Insert the profile into MongoDB
        profile_doc = {
            "name": name,
            "email": email,
            "role": role,
            "bio": bio,
            "image_filename": filename
        }
        result = profiles_collection.insert_one(profile_doc)

        # Build a URL for the image so it can be displayed
        image_url = (
            url_for("static", filename=f"uploads/{filename}", _external=True)
            if filename else ""
        )

        return jsonify({
            "success": True,
            "profile": {
                "id": str(result.inserted_id),
                "name": name,
                "email": email,
                "role": role,
                "bio": bio,
                "image": image_url
            }
        }), 201

    else:
        # GET: Return all profiles as JSON
        profile_docs = list(profiles_collection.find())
        profiles_list = []
        for doc in profile_docs:
            doc_id = str(doc["_id"])
            image_url = (
                url_for("static", filename=f"uploads/{doc['image_filename']}", _external=True)
                if doc.get("image_filename") else ""
            )
            profiles_list.append({
                "id": doc_id,
                "name": doc.get("name", ""),
                "email": doc.get("email", ""),
                "role": doc.get("role", ""),
                "bio": doc.get("bio", ""),
                "image": image_url
            })

        return jsonify(profiles_list)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
