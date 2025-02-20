const Wrapper = ({ children }) => {
    return (
      <div
        className="wrapper"
        style={{
          padding: '20px',
          border: '2px solid #ccc',
          borderRadius: '8px',
          display: 'flex', 
          justifyContent: 'center', 
          gap: '2rem', 
          flexWrap: 'wrap', 
        }}
      >
        {children}
      </div>
    );
  };
  
  export default Wrapper;
  