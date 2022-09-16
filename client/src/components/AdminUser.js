import React from "react";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import AdminUserInfo from "./AdminUserInfo";
import { MdEmail, MdUpdate } from "react-icons/md";
import { IoPerson, IoTime } from "react-icons/io5";
import { BsFillBagCheckFill } from "react-icons/bs";
import { GrValidate } from "react-icons/gr";

const AdminUser = ({ _id, firstName, email, lastName, type, location }) => {
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{email.charAt(0)}</div>
        <div className="info">
          <h5>{type}</h5>
          <p>{firstName}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <AdminUserInfo
            icon={<IoPerson />}
            text={`${firstName} ${lastName}`}
          />
          <AdminUserInfo icon={<FaCalendarAlt />} text={lastName} />
          <AdminUserInfo icon={<FaBriefcase />} text={type} />
          {/* <div className={`status ${status}`}>{status}</div> */}
        </div>

        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              // onClick={() => setEdit(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              // onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default AdminUser;
