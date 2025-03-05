import React, { useState } from 'react';

const ProfileForm = ({ addProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name || !formData.email || !formData.role || !formData.bio) {
        setError('All fields are required.');
        setLoading(false);
        return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('bio', formData.bio);
    if (formData.image) {
        formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch('http://localhost:5001/api/profiles', {
        method: 'POST',
        body: formDataToSend,
      });
        const result = await response.json();

        if (result.success) {
            alert('Profile saved successfully!');
            addProfile({
                name: formData.name,
                email: formData.email,
                role: formData.role,
                bio: formData.bio,
                image: formData.image ? URL.createObjectURL(formData.image) : '',
            });
        } else {
            setError(result.message);
        }
    } catch (error) {
        console.error('Error saving profile:', error);
        setError('Please try again');
    } finally {
        setLoading(false);
    }
};

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: 'auto',
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    marginBottom: '0.5rem',
  };

  const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Bio:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      {loading && <p>Uploading: {progress}%</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading} style={loading ? buttonDisabledStyle : buttonStyle}>
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
};

export default ProfileForm;