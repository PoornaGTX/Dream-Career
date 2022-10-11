import React from "react";
import { useState } from "react";
import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const ApplyJob = () => {
  const {
    showAlert,
    displayAlert,
    isLoading,
    applyJob,
    editJobCreateID,
    company,
    position: AppliedPosition,
  } = useAppContext();

  const [position, setPosition] = useState(AppliedPosition);
  const [education, setEducation] = useState("Undergraduate");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("Remote");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !education || !location || !experience || !jobType) {
      displayAlert();
      return;
    } else {
      applyJob({
        position,
        education,
        location,
        experience,
        jobType,
        editJobCreateID,
        company,
      });
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>My Application</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="Position"
            value={position}
            handleChange={(e) => setPosition(e.target.value)}
            // inputPattern={true}
            pcText="add position"
          />
          <FormRowSelect
            name="Education"
            value={education}
            handleChange={(e) => setEducation(e.target.value)}
            list={["Undergraduate", "Graduate", "Masters", "Phd"]}
          />
          <FormRow
            type="text"
            name="Location"
            value={location}
            pcText="add location"
            handleChange={(e) => setLocation(e.target.value)}
            inputPattern={true}
          />
          <FormRow
            type="text"
            name="Experience"
            pcText="add experience"
            value={experience}
            handleChange={(e) => setExperience(e.target.value)}
          />
          <FormRowSelect
            name="Job Type"
            value={jobType}
            handleChange={(e) => setJobType(e.target.value)}
            list={["Remote", "On-location", "Hybrid"]}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait.." : "Apply Job"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ApplyJob;
