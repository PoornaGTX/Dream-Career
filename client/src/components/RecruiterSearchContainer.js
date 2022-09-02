import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

const RecruiterSearchContainer = () => {
  const {
    isLoading,
    recSearch,
    recSearchType,
    recSort,
    recSortOptions,
    handleChange,
    clearFilters,
    jobTypeOptions,
  } = useAppContext()
  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
  }
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search position */}

          <FormRow
            type='text'
            name='recSearch'
            value={recSearch}
            handleChange={handleSearch}
          />  
          {/* search by type */}
          <FormRowSelect
            labelText='type'
            name='recSearchType'
            value={recSearchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* recSort */}
          <FormRowSelect
            name='recSort'
            value={recSort}
            handleChange={handleSearch}
            list={recSortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default RecruiterSearchContainer
