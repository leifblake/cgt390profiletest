import headshot2 from '../assets/headshot2.png';

function Card2() {
  return (
    <div className="card">
      <img
        src={headshot2}
        alt="Sam Johnson"
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '1rem',
        }}
      />
      <h2>Sam Johnson</h2>
      <p>UX Designer</p>
    </div>
  );
}

export default Card2;
