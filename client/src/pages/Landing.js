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
            Dream Career is a platform for posting and finding jobs. By using
            this system job recruiters can post their job vacancies and job
            applicants can find and apply for the jobs they are interested in.
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
