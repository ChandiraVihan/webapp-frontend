import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import GradientText from './GradientText';
import TiltedCard from './TiltedCard';

function HomePage() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/start');
  };

  return (
    // This main container now centers the card
    <div className="home-container">
      <TiltedCard>
      {/* This new div is the container for your content */}
      <div className="content-card">

        <h1 className="home-title">
          <GradientText colors={["#FF0099","#99f2c8", "#3b8d99" , "#FF0099"]} animationSpeed={6}>
            Welcome to the NexaCore!
          </GradientText>
        </h1>

        <img 
          src="https://i.postimg.cc/qMkmDg9G/cute-monitor-playing-skateboard-cartoon-vector-icon-illustration-technology-sport-icon-isolated-1386.avif" 
          alt="Cute monitor on a skateboard" 
          className="home-image" 
        />

        <button onClick={handleGetStartedClick} className="get-started-btn">
          Get Started
        </button>

      </div>
      {/* End of content container */}
        </TiltedCard>
    </div>
  );
}

export default HomePage;


