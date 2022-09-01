import React from "react";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import JobRequests from "./JobRequests";

const JobRequestsContainer = () => {
    const {  
        getJobRequets,
        jobs,
        isLoading,
        page,
        totalJobs,
        recSearch,
        recSearchType,
        recSort,
        numOfPages,
     } = useAppContext();
    
      useEffect(() => {
        getJobRequets();
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
            {totalJobs} job{jobs.length > 1 && "s"} found
          </h5>
          <div className="jobs">
            {jobs.map((job) => {
              return <JobRequests key={job._id} {...job} />;
            })}
          </div>
        </Wrapper>
      );
};

export default JobRequestsContainer
