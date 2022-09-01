import React from "react";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";

const JobsContainer = () => {
  

  return (
    <Wrapper>
      <h1>all jobs</h1>
    </Wrapper>
  );
};

export default JobsContainer;
