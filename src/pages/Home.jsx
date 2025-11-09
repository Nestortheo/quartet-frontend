import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import quartetImg from '../assets/HomeImage.jpg'; // ✅ adjust path as needed

const Home = () => {
  return (
    <main className="home-content">
      <div className="text-section">
        <h1 className="text-3xl font-bold text-blue-600">Tailwind v4 works!</h1>
        <h1>Contact us!</h1>
        <p className="tagline">Vienna-based string quartet exploring the boundaries of classical and contemporary music.</p>
        <p>erinys.stringquartet@gmail.com</p>
        <Link to="/concerts" className="cta-button">See Upcoming Concerts</Link>
        <img src={quartetImg} alt="Erinys Quartet" className="contact-image" />
      </div>
    </main>
  );
};

export default Home;