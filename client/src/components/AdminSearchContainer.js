import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
const AdminSearchContainer = () => {
  const {
    isLoading,
    searchAdmin,
    handleChange,
    sortOptionsAdmin,
    sortAdmin,
    searchTypeAdmin,
    searchTypeOptionsAdmin,
    clearValuesAdmin,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmission = (e) => {
    e.preventDefault();
    clearValuesAdmin();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        {/* search position */}
        <div className="form-center">
          <FormRow
            type="text"
            name="searchAdmin"
            value={searchAdmin}
            handleChange={handleSearch}
          ></FormRow>
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchTypeAdmin"
            value={searchTypeAdmin}
            handleChange={handleSearch}
            list={["all", ...searchTypeOptionsAdmin]}
          ></FormRowSelect>
          {/* sort */}
          <FormRowSelect
            labelText="sort"
            name="sortAdmin"
            value={sortAdmin}
            handleChange={handleSearch}
            list={sortOptionsAdmin}
          ></FormRowSelect>
          <button
            onClick={handleSubmission}
            disabled={isLoading}
            className="btn btn-block btn-danger"
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default AdminSearchContainer;
