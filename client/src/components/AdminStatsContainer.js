import React from "react";
import AdminStatItem from "./AdminStatItem";
import { FaUserShield, FaUserPlus, FaUserTie } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useAppContext } from "../context/appContext";

const AdminStatsContainer = () => {
  const { adminStats, allusersAdmin } = useAppContext();

  const Applicants = allusersAdmin.filter((user) => user.type === "Applicant");
  const Recruiters = allusersAdmin.filter((user) => user.type === "Recruiter");
  const Admin = allusersAdmin.filter((user) => user.type === "Admin");

  const defaultStats = [
    {
      title: "Total Applicents",
      count: adminStats.Applicant,
      icon: <FaUserPlus />,
      color: "#e9b949",
      bcg: "#fcefc7",
      userData: Applicants,
      dateType: "Applicants",
    },
    {
      title: "Total Recruiters",
      count: adminStats.Recruiter,
      icon: <FaUserTie />,
      color: "#647acb",
      bcg: "#e0e8f9",
      userData: Recruiters,
      dateType: "Recruiters",
    },
    {
      title: "Total Admins",
      count: adminStats.Admin,
      icon: <FaUserShield />,
      color: "#d66a6a",
      bcg: "#ffeeee",
      userData: Admin,
      dateType: "Admin",
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
