import React from "react";
import { JobsContainer} from "../../components";
import RecruiterSearchContainer from "../../components/RecruiterSearchContainer";

export const AllJobs = () => {
  return (
    <>
      <RecruiterSearchContainer/>
      <JobsContainer />
    </>
  );
};

export default AllJobs;
