import headshot1 from '../assets/headshot1.png';

function Card1() {
  return (
    <div className="card">
      <img
        src={headshot1}
        alt="Alexander Doe"
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '1rem',
        }}
      />
      <h2>Alexander Doe</h2>
      <p>Web Developer</p>
    </div>
  );
}

export default Card1;
