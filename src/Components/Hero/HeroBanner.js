import React from "react";
import "./HeroBanner.css";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div>
      HeroBanner
      <Link to={"/signin"} style={{ color: "blue", border: "solid 1px red" }}>
        SignInPage
      </Link>
      <Link to={"/signup"} style={{ color: "blue", border: "solid 1px red" }}>
        SignUp
      </Link>
    </div>
  );
};

export default HeroBanner;
