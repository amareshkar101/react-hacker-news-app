import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/img.svg";
import "../styles/LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="i">
      <div className="i-left">
        <img src={img} alt="" />
      </div>
      <div className="i-right">
        <h1 className="heading">Hacker News</h1>
        <h2 className="para">
          Get the latest news from India, politics, entertainment, sports and
          other feature stories.
        </h2>
        <button className="btn" onClick={() => navigate("/home")}>
          GET STARTED
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
