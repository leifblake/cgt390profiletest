import React from 'react';

function Card({ name, role, image, title, bio }) {
    return (
      <div className="card">
        <img
          src={image}
          alt={name}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '1rem',
          }}
        />
        <h2>{name}</h2>
        <p>{role}</p>
        {title && <p><strong>{title}</strong></p>}
        {bio && <p>{bio}</p>}
      </div>
    );
}

export default Card;
