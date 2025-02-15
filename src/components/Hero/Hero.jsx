import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
       <section className="hero">
         
            <div className="hero-container">
                <img src="/Hero.png" alt="Hero" className="hero-image" />
                <div className="hero-content">
                    <h1>Denim Season</h1>
                    <p>Explore the latest trends in denim fashion.</p>
                </div>
            </div>
       </section>
    );
}

export default Hero;