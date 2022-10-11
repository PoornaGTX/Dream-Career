import React from "react";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import RecJob from "./RecJob";

const JobsContainer = () => {
  const { getJobs, jobs, isLoading, recSearch, recSearchType, recSort } =
    useAppContext();

  useEffect(() => {
    getJobs();
  }, [recSearch, recSearchType, recSort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {jobs.length} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <RecJob key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
