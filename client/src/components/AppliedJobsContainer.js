import React from "react";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import AppliedJob from "./AppliedJob";

const AppliedJobsContainer = () => {
  const {
    isLoading,
    AppliedJobs,
    getAppliedJobs,
    appliedJobsSearch,
    appliedJobsSearchType,
    appliedJobsSort,
  } = useAppContext();

  useEffect(() => {
    getAppliedJobs();
  }, [appliedJobsSearch, appliedJobsSearchType, appliedJobsSort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (AppliedJobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {AppliedJobs.length} job{AppliedJobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {AppliedJobs.map((job) => {
          return <AppliedJob key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default AppliedJobsContainer;
