import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Hero.css";

const Hero = () => {
    const navigate = useNavigate(); 

    return (
        <section className="hero">
            <div className="hero-container">
                <img
                    src="/Hero.png"
                    alt="Hero"
                    className="hero-image"
                    onClick={() => navigate("/")} // Här navigerar vi till startsidan vid klick
                    style={{ cursor: "pointer" }} 
                />
                <div className="hero-content">
                    <h1>Denim Season</h1>
                    <p>Explore the latest trends in denim fashion.</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
