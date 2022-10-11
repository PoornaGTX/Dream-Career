import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user, showAlert, updateUser, isLoading, logoutUser } =
    useAppContext();

  const navigate = useNavigate();

  const [firstName, setName] = useState(user?.firstName);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ firstName, email, lastName, location });
  };

  //event handler for change password
  const changePassword = () => {
    navigate("/login/frogetpassword");
    logoutUser();
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="First Name"
            name="firstName"
            value={firstName}
            inputPattern={true}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="Last Name"
            name="lastName"
            value={lastName}
            inputPattern={true}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />

          <button
            className="btn btn-block"
            type="submit"
            disabled={isLoading}
            onClick={changePassword}
          >
            {isLoading ? "Please Wait.." : "Change Password"}
          </button>

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait.." : "Save and Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
