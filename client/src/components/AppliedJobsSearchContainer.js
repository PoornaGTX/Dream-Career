import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const AppliedJobsSearchContainer = () => {
  const {
    isLoading,
    handleChange,
    clearFilters,
    appliedJobsSearchTypePotions,
    appliedJobsSearch,
    appliedJobsSearchType,
    appliedJobsSort,
    appliedJobsSortOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            labelText="search"
            type="text"
            name="appliedJobsSearch"
            value={appliedJobsSearch}
            handleChange={handleSearch}
          ></FormRow>

          <FormRowSelect
            labelText="job type"
            name="appliedJobsSearchType"
            value={appliedJobsSearchType}
            handleChange={handleSearch}
            list={["all", ...appliedJobsSearchTypePotions]}
          ></FormRowSelect>

          <FormRowSelect
            labelText="sort"
            name="appliedJobsSort"
            value={appliedJobsSort}
            handleChange={handleSearch}
            list={appliedJobsSortOptions}
          ></FormRowSelect>
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

export default AppliedJobsSearchContainer;
