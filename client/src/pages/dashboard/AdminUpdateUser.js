import React, { useState, useEffect } from "react";
import { Alert, FormRow } from "../../components/index";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useNavigate } from "react-router-dom";

const AdminUpdateUser = () => {
  const {
    showAlert,
    displayAlert,
    isLoading,
    isUpdate,
    updateUserAdmin,
    isDelete,
    deleteUser,
    firstName,
    lastName,
    location,
    type,
    email,
    user,
  } = useAppContext();

  const [UPname, setUPname] = useState(firstName);
  const [UPlname, setUPlname] = useState(lastName);
  const [UPemail, setUPemail] = useState(email);
  const [UPtype, setUPtype] = useState(type);
  const [UPlocation, setUPlocation] = useState(location);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      if (!UPname || !UPemail) {
        displayAlert();
        return;
      }
      updateUserAdmin({
        UPname,
        UPlname,
        UPtype,
        UPemail,
        UPlocation,
      });
    }
    if (isDelete) {
      deleteUser();
    }

    setTimeout(() => {
      navigate("/all-users");
    }, 2000);
  };
  const navigator = useNavigate();
  useEffect(() => {
    if (user.type !== "Admin") {
      navigator("/");
    }
  });
  return (
    <Wrapper>
      <form className="form">
        {isUpdate && <h3>Update User</h3>}
        {isDelete && <h3>Delete User</h3>}

        {showAlert && <Alert />}
        <div className="form-center">
          <>
            <FormRow
              type="text"
              name="First name"
              value={UPname}
              handleChange={(e) => setUPname(e.target.value)}
              isReadOnly={isDelete ? true : false}
            />

            <FormRow
              type="text"
              name="Last name"
              value={UPlname}
              handleChange={(e) => setUPlname(e.target.value)}
              isReadOnly={isDelete ? true : false}
            />
            <FormRow
              type="email"
              name="email"
              value={UPemail}
              handleChange={(e) => setUPemail(e.target.value)}
              isReadOnly={isDelete ? true : false}
            />

            <FormRow
              type="text"
              name="location"
              value={UPlocation}
              handleChange={(e) => setUPlocation(e.target.value)}
              isReadOnly={isDelete ? true : false}
            />
            <div>
              <label htmlFor="type" className="form-label">
                Type
              </label>
              <select
                name="type"
                value={UPtype}
                onChange={(e) => setUPtype(e.target.value)}
                className="form-input"
                disabled={isDelete && "disabled"}
              >
                <option value="Student">Student</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </>
          {isUpdate && (
            <button
              className="btn btn-block"
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Please wait..." : "Save changes"}
            </button>
          )}
          {isDelete && (
            <button
              className="btn btn-block"
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Please wait..." : "Delete User"}
            </button>
          )}
        </div>
      </form>
    </Wrapper>
  );
};

export default AdminUpdateUser;
