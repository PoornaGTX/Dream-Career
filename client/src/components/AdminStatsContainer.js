import React from "react";
import AdminStatItem from "./AdminStatItem";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useAppContext } from "../context/appContext";

const AdminStatsContainer = () => {
  const { adminStats } = useAppContext();

  const defaultStats = [
    {
      title: "Total Applicents",
      count: adminStats.Applicant,
      icon: <FaLocationArrow />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Total Recruiters",
      count: adminStats.Recruiter,
      icon: <FaLocationArrow />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Total Admins",
      count: adminStats.Admin,
      icon: <FaLocationArrow />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <AdminStatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default AdminStatsContainer;
