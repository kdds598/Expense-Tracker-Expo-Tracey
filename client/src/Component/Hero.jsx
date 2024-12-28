import React from "react";
import "../Styles/Hero.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/Context";
const Hero = () => {
  const { user, uloading } = useAuth();

  return (
    <section className="hero">


      <div className="hero-content">
        <h1 className="hero-title">EXPO-Tracey</h1>

        <h1 className="hero-title">Budget Smarter, Spend Wiser</h1>
        <p className="hero-subtitle">
          Welcome to Your Personal Finance Hub! Here, we empower you to take
          control of your money through effective tracking and insightful
          management tools. Let’s embark on your financial journey together!{" "}
        </p>
        <div className="hero-buttons">
          {user ? (
            <Link
              to="/accounts"
              style={{ textDecoration: "none" }}
              className="btn-primary"
            >
              Get started
            </Link>
          ) : (
            <Link
              to="/signup"
              style={{ textDecoration: "none" }}
              className="btn-primary"
            >
              Get started
            </Link>
          )}
          <Link to="/about" className="learn-more">
            Learn more →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
