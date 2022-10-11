import React from "react";
import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  type: "Applicant",
  isMember: true,
};

const Register = () => {
  //global values coming from the AppContext
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, type, isMember } = values;
    if (!email || !password || (!isMember && !firstName)) {
      displayAlert();
      return;
    }

    if (isMember) {
      const currentUser = { firstName, lastName, email, password };

      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting",
      });
    } else {
      const currentUser = { firstName, lastName, email, password, type };
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created!! Redirecting",
      });
    }
  };

  const passwordRest = () => {
    navigate("/login/frogetpassword");
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <>
            <FormRow
              type="text"
              labelText="First name"
              name="firstName"
              value={values.firstName}
              inputPattern={true}
              placeHolderText={"Enter your first name"}
              handleChange={handleChange}
            />

            <FormRow
              type="text"
              labelText="Last Name"
              name="lastName"
              value={values.lastName}
              inputPattern={true}
              placeHolderText={"Enter your last name"}
              handleChange={handleChange}
            />

            <div className="form-row">
              <label htmlFor="type" className="form-label">
                Type
              </label>
              <select
                name="type"
                value={values.type}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Applicant">Applicant</option>
                <option value="Recruiter">Recruiter</option>
              </select>
            </div>
          </>
        )}
        {/* email input from component */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          placeHolderText={"Enter your email"}
          handleChange={handleChange}
        />
        {/* password input from component */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          placeHolderText={"Enter your password"}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>

          <button type="button" className="member-btn" onClick={passwordRest}>
            Forgot password
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
