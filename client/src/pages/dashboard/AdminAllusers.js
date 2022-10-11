import React, { useEffect } from "react";
import AdminSearchContainer from "../../components/AdminSearchContainer";
import AdminUserContainer from "../../components/AdminUserContainer";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigator = useNavigate();
  const { user } = useAppContext();

  useEffect(() => {
    if (user.type !== "Admin") {
      navigator("/");
    }
  });

  return (
    <>
      <AdminSearchContainer />
      <AdminUserContainer />
    </>
  );
};

export default AllUsers;
