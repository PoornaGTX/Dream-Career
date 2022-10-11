import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import AdminUserInfo from "./AdminUserInfo";
import { MdEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { AiTwotoneEnvironment } from "react-icons/ai";

const AdminUser = ({ _id, firstName, email, lastName, type, location }) => {
  const { setDeleteUser, setUpdateUser } = useAppContext();
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
          <AdminUserInfo icon={<AiTwotoneEnvironment />} text={location} />
          <AdminUserInfo icon={<MdEmail />} text={email} />
        </div>

        <footer>
          <div className="actions">
            <Link
              to="/admin-update"
              className="btn edit-btn"
              onClick={() => setUpdateUser(_id)}
            >
              edit
            </Link>
            <Link
              to="/admin-update"
              className="btn delete-btn"
              onClick={() => setDeleteUser(_id)}
            >
              Delete
            </Link>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default AdminUser;
