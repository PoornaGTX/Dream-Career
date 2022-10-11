import React from "react";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import Alert from "../components/Alert";

const FrogetPassword = () => {
  const navigate = useNavigate();
  //get states from globel context
  const {
    user,
    isLoading,
    showAlert,
    loginUserPasswordRest,
    displayAlert,
    PasswordRestStatus,
  } = useAppContext();

  //states
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    //validate the inputs
    if (!email) {
      displayAlert();
      return;
    }

    loginUserPasswordRest(email);

    setTimeout(() => {
      alert("Password reset link is sent your email, please check your email");
    }, 2000);
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
        {showAlert && <Alert />}
        <h3>{PasswordRestStatus ? "Reset Password" : "Forgot Password"}</h3>

        <label>Enter Email Here</label>
        <input
          className="form-input"
          type="email"
          name="email"
          value={email}
          placeholder="Enter email that you used for sign-up"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          reset
        </button>
      </form>
    </Wrapper>
  );
};

export default FrogetPassword;
