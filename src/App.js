import React, { useState, useEffect } from 'react';
import background from './background.png'; 

function App() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // This is a mock endpoint that returns a new image URL every 5 seconds
    const endpoint = 'https://dream-machine-helper.azurewebsites.net/api/getImgURL';
    const intervalId = setInterval(() => {
      fetch(endpoint, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
          'Content-Type': 'application/json',
      }
      })
        .then((response) => response.json())
        .then((data) => setImageUrl(data.url))
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    // background: 'repeating-radial-gradient(#59d3e0, transparent 100px)',
  };

  return (
    <div 
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
      <div style={style}>
        <body>
          <h1>Welcome to Dream Machine</h1>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="latest dream"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                className="dream-image"
              />
            ) : (
              <p>Loading image...</p>
            )}
          <p className="image-label">Latest Dream</p>
          <h2>Call +1(479)-348-1521 to submit your dream</h2>
        </body>
      </div>
    </div>
  );
}

export default App;
