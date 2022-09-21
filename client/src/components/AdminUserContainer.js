import React from "react";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import AdminUser from "./AdminUser";
import Wrapper from "../assets/wrappers/JobsContainer";

const AdminUserContainer = () => {
  const {
    getUsers,
    users,
    isLoading,
    page,
    totalUsers,
    searchAdmin,
    sortAdmin,
    searchTypeAdmin,
  } = useAppContext();

  useEffect(() => {
    getUsers();
  }, [searchAdmin, sortAdmin, searchTypeAdmin]);

  if (isLoading) {
    return <Loading center />;
  }

  if (users.length === 0) {
    return (
      <Wrapper>
        <h2>No Users to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalUsers} user{users.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {users.map((user) => {
          return <AdminUser key={user._id} {...user} />;
        })}
      </div>
    </Wrapper>
  );
};

export default AdminUserContainer;
