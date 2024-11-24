import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const quotes = [
    "Success is built on persistence. Every line of code, every bug fixed, and every project completed has paved the way for your incredible journey.",
    "The best is yet to come. You're not just a developer—you're a creator, a visionary, and a leader.",
    "Don't stop when you're tired. Stop when you're done. Your hard work will pay off!",
    "Dream big, work hard, stay focused, and the sky is the limit. Your journey is just beginning.",
    "Every great developer you know started where you are now. Keep going, keep improving, keep evolving!",
    "The future belongs to those who believe in the beauty of their dreams. Keep coding, keep pushing forward!"
  ];

  // State to hold the random quote
  const [quote, setQuote] = useState('');

  // Pick a random quote when the component mounts
  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);
  return (
    <div className="App">
      <div className="container text-center text-white d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="card custom-card shadow-xl p-5 mb-5">
          <h1 className="display-3 fw-bold text-gradient animated-text">Welcome Back, Mithlesh Maurya!</h1>
          <h2 className="mt-3 display-4 text-uppercase animate__animated animate__fadeIn animate__delay-1s">Your Journey is a Story of Dedication & Growth</h2>
          <p className="lead mt-4 text-light animate__animated animate__fadeIn animate__delay-2s">
            From your early days as a passionate student of Information Technology to becoming a skilled MERN stack developer, your dedication has been unstoppable.
          </p>
          <p className="lead mt-4 text-light animate__animated animate__fadeIn animate__delay-3s">
            You took the challenge to develop dynamic, real-time applications with Node.js, MongoDB, and React.js. Your expertise has expanded into PWA features, game development, and even chrome extensions!
          </p>
          <p className="lead mt-4 text-light animate__animated animate__fadeIn animate__delay-4s">
            Now, as the CEO of Cricdekho, your vision for the future is clear: to bring innovative solutions to sports, technology, and AI. Keep pushing the boundaries and continue inspiring others along the way!
          </p>
          {/* <div className=""> */}
          <p className="quote-box text-muted animated-text display-6 quote-text animate__animated animate__fadeIn animate__delay-2s animate__bounceInUp">
            "{quote}"
          </p>
        {/* </div> */}
        </div>

        {/* <div className="quote-box text-muted animated-text">
        
        </div> */}
      </div>
    </div>
  );
}

export default App;
