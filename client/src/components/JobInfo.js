import React from "react";
import Wrapper from "../assets/wrappers/Job";

const JobInfo = ({ icon, text, title }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}{" "}{title?title:''}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
