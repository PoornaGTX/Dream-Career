import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import Alert from "../components/Alert";

const PasswordRest = () => {
  const { id, token } = useParams();

  const navigate = useNavigate();

  //states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //get states from globel context
  const { isLoading, showAlert, displayAlert, loginUserNewPassword } =
    useAppContext();

  //event handler for password reset
  const onSubmit = (e) => {
    e.preventDefault();

    //validate the inputs
    if (!password || !confirmPassword) {
      displayAlert();
      return;
    }

    if (password !== confirmPassword) {
      console.log(password, confirmPassword);
      alert("Password is mismatch");
      return;
    }

    loginUserNewPassword(password, id, token);

    setTimeout(() => {
      navigate("/register");
    }, 4000);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <h3>Reset Password</h3>

        {showAlert && <Alert />}
        <label>Enter New Password</label>
        <input
          className="form-input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Re-Enter New Password</label>
        <input
          className="form-input"
          type="password"
          name="Re-Enter Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
      </form>
    </Wrapper>
  );
};

export default PasswordRest;
