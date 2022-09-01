import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info*/}

        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>

          <p>
            I'm baby you probably haven't heard of them pug chambray, knausgaard
            af kombucha next level hashtag portland tumblr selfies quinoa
            pitchfork affogato. Literally mixtape disrupt ramps lo-fi man braid.
          </p>

          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
