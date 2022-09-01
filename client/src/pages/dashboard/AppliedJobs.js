import React, { useEffect } from "react";
import {
  AppliedJobsContainer,
  AppliedJobsSearchContainer,
} from "../../components";
import { useAppContext } from "../../context/appContext";

const AppliedJobs = () => {
  
  return (
    <>
      <AppliedJobsSearchContainer />
      <AppliedJobsContainer />
    </>
  );
};

export default AppliedJobs;
