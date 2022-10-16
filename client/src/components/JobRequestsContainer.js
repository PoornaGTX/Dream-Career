import React from "react";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import JobRequests from "./JobRequests";

const JobRequestsContainer = () => {
    const {  
        getJobRequets,
        isLoading,
        jobRequests,
        recSearch, 
        recSearchType, 
        recSort,
        status
     } = useAppContext();
    
      useEffect(() => {
        getJobRequets();
      }, [recSearch, recSearchType, recSort, status]);
    
      if (isLoading) {
        return <Loading center />;
      }
    
      if (jobRequests.length === 0) {
        return (
          <Wrapper>
            <h2>No Jobs to display...</h2>
          </Wrapper>
        );
      }
    
      return (
        <Wrapper>
          <div className="jobs">
            {jobRequests.map((job) => {
              return <JobRequests key={job._id} {...job} />;
            })}
          </div>
        </Wrapper>
      );
};

export default JobRequestsContainer
