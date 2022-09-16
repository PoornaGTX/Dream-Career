import React, { useEffect } from "react";
import SearchContainer from "../../components/SearchContainer";
import AdminUserContainer from "../../components/AdminUserContainer";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigator = useNavigate();
  const { user } = useAppContext();

  useEffect(() => {
    // console.log(user.type);
    if (user.type !== "Admin") {
      navigator("/");
    }
  });

  return (
    <>
      <SearchContainer />
      <AdminUserContainer />
    </>
  );
};

export default AllUsers;
