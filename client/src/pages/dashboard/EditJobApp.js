import React from "react";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const EditJobApp = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    handleChange,
    clearValues,
    isEditing,
    editJobAPP,
    jobAppType,
    jobAppLocation,
    jobAppCompany,
    jobAppPosition,
    jobAppEducation,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobAppEducation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJobAPP();
      return;
    }
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>Edit Applied job</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/*position*/}
          <FormRow
            type="text"
            name="jobAppPosition"
            value={jobAppPosition}
            handleChange={handleJobInput}
            isReadOnly={true}
          />
          {/*company*/}
          <FormRow
            type="text"
            name="jobAppCompany"
            value={jobAppCompany}
            isReadOnly={true}
            handleChange={handleJobInput}
          />
          {/*location*/}
          <FormRow
            type="text"
            labelText="job location"
            name="jobAppLocation"
            value={jobAppLocation}
            isReadOnly={true}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name="jobAppEducation"
            labelText="Qualification"
            value={jobAppEducation}
            handleChange={handleJobInput}
            list={["Undergraduate", "Graduate", "Masters", "Phd"]}
          />
          {/* job type */}
          <FormRow
            name="jobAppType"
            labelText="job type"
            value={jobAppType}
            isReadOnly={true}
            handleChange={handleJobInput}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditJobApp;
