from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

# Set up MongoDB connection (adjust URI and database name as needed)
client = MongoClient("mongodb://localhost:27017/")
db = client['your_database_name']  # Replace with your database name
profiles = db['profiles']  # Collection for profile data

# Configure the folder for local image uploads
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static/uploads')
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'POST':
        # Get the text field data
        name = request.form.get('name')
        # Get the uploaded file
        image_file = request.files.get('image')
        
        if image_file and image_file.filename != '':
            filename = secure_filename(image_file.filename)
            upload_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image_file.save(upload_path)
            
            # Insert profile data into MongoDB
            profiles.insert_one({
                'name': name,
                'image_filename': filename  # Save filename to later reference the image
            })
        
        return redirect(url_for('profile'))
    
    # For GET requests, retrieve all profiles from the database
    profile_list = list(profiles.find())
    return render_template('profile.html', profiles=profile_list)

if __name__ == '__main__':
    app.run(debug=True)
