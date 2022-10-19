import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useLocation } from "react-router-dom";

const RecruiterSearchContainer = () => {
const route = useLocation()
  const {
    isLoading,
    recSearch,
    recSearchType,
    recSort,
    recSortOptions,
    handleChange,
    clearRecFilters,
    jobTypeOptions,
    status,
    statusOptions
  } = useAppContext();
  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    clearRecFilters()
  }
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type='text'
            name='recSearch'
            labelText='Search Jobs'
            value={recSearch}
            handleChange={handleSearch}
          />
          {/* search by type */}
          {route.pathname!=='/job-requests'&&<FormRowSelect
            labelText='Job Type'
            name='recSearchType'
            value={recSearchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />}
          {route.pathname==='/job-requests'&&<FormRowSelect
            labelText='Status'
            name='status'
            value={status}
            handleChange={handleSearch}
            list={[...statusOptions]}
          />}
          {/* recSort */}
          <FormRowSelect
            name='recSort'
            labelText='Sort'
            value={recSort}
            handleChange={handleSearch}
            list={recSortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default RecruiterSearchContainer;
