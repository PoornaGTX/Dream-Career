import React from "react";
import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

const AppliedJob = ({
  _id,
  experience,
  jobType,
  education,
  position,
  location,
  company,
  createdAt,
  Status,
}) => {
  const { setEditJobApp, deleteJobApp } = useAppContext();

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
          <JobInfo icon={<FaLocationArrow />} text={location} />
          <JobInfo icon={<FaLocationArrow />} text={experience} />
          <JobInfo icon={<FaLocationArrow />} text={education} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <JobInfo icon={<FaBriefcase />} text={Status} />
        </div>

        <footer>
          <div className="actions">
            <Link
              to="/edit-app-job"
              className="btn edit-btn"
              onClick={() => setEditJobApp(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteJobApp(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default AppliedJob;
