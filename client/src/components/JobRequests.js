import React from "react";
import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt, FaRegEnvelopeOpen, FaRegUser, FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

const JobRequests = ({
    _id,
  appliedBy,
  recruiterID,
  name,
  email,
  experience,
  jobType,
  education,
  position,
  location,
  company,
  createdAt,
}) => {
    const { acceptJobRequest,
      rejectJobRequest } = useAppContext();

    let date = moment(createdAt);
    date = date.format("MMM Do, YYYY");
    return (
      <Wrapper>
        <header>
          <div className="main-icon">{company.charAt(0)}</div>
          <div className="info">
            <h5>{position}</h5>
            <p>{company}</p>
          </div>
        </header>
        <div className="content">
          <div className="content-center">
            <JobInfo icon={<FaRegUser />} text={name} title='Name'/>
            <JobInfo icon={<FaRegEnvelopeOpen />} text={email} title='Email'/>
            {/* <JobInfo icon={<FaLocationArrow />} text={location} title='Location'/> */}
            <JobInfo icon={<FaLocationArrow />} text={experience} title='Experience' />
            <JobInfo icon={<FaUniversity />} text={education} title='Education'/>
            <JobInfo icon={<FaCalendarAlt />} text={date} title='Date'/>
            {/* <JobInfo icon={<FaBriefcase />} text={jobType} title='JobType'/> */}
            {/* <div className={`status ${status}`}>{status}</div> */}
          </div>
  
          <footer>
            <div className="actions">
              <button
                type="button"
                className="btn edit-btn"
                onClick={() => acceptJobRequest(_id)}
              >
                Accept
              </button>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => rejectJobRequest(_id)}
              >
                Reject
              </button>
            </div>
          </footer>
        </div>
      </Wrapper>
    );
  };

export default JobRequests
