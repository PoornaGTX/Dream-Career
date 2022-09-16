import React from "react";
import links from "../utils/links";
import { useAppContext } from "../context/appContext";
import { NavLink, useNavigate } from "react-router-dom";

const NavLinks = ({ toggleSidebar }) => {
  const { user } = useAppContext();

  let NewLinks = links;

  if (user.type === "Recruiter" || user.type === "Applicant") {
    NewLinks = NewLinks.filter((link) => {
      if (
        link.path !== "all-users" &&
        link.path !== "all-jobs" &&
        link.path !== "profile"
      ) {
        return link;
      }
    });
  }

  //Recruiter

  if (user.type === "Admin" || user.type === "Applicant") {
    NewLinks = NewLinks.filter((link) => {
      if (link.path !== "job-requests" && link.path !== "add-job") {
        return link;
      }
    });
  }

  // //Applicant

  // // if (user.type === "Admin" || user.type === "Recruiter") {
  // //   NewLinks = NewLinks.filter((link) => {
  // //     if (link.path !== "job-requests" && link.path !== "add-job") {
  // //       return link;
  // //     }
  // //   });
  // }

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={
              ({ isActive }) => (isActive ? "nav-link active" : "nav-link")
              /* arrow function eke isActive true name style tika true da balanwa */
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
