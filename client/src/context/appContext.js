import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  GET_JOBS_ERROR,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  APPLY_JOB_BEGIN,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_ERROR,
  LOGIN_PASSWORDREST,
  LOGIN_PASSWORDREST_COMPLETE,
  LOGIN_PASSWORDREST_ERROR,
  GET_APPLIED_JOBS_SUCCESS,
  GET_APPLIED_JOBS_BEGIN,
  CLEAR_FILTERS_APPLIED_JOBS,
} from "./action";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userlocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userlocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  editJobCreateID: "",
  position: "",
  company: "",
  jobLocation: userlocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  AppliedJobs: [],
  AppliedTotalJobs: 0,
  AppliedJobsNumOfPages: 1,
  AppliedJobsPage: 1,
  appliedJobsSearch: "",
  appliedJobsSearchType: "all",
  appliedJobsSearchTypePotions: ["Remote", "On-location", "Hybrid"],
  appliedJobsSort: "latest",
  appliedJobsSortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  //store user details in local storage

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  //remove user details in local storage when logout

  const removeFromTheLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      //console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      //console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //login

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/login", currentUser);

      const { user, token, location } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, location } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeFromTheLocalStorage();
  };

  //password reset email verification

  const loginUserPasswordRest = async (email) => {
    dispatch({ type: LOGIN_PASSWORDREST });
    try {
      const response = await axios.post(
        "https://sbwcnnxsyc.execute-api.us-east-1.amazonaws.com/dev/api/V1/users/login/frogetpassword",
        {
          email,
        }
      );
      dispatch({
        type: LOGIN_PASSWORDREST_COMPLETE,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_PASSWORDREST_ERROR,
      });
    }
    clearAlert();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getJobs = async () => {
    let url = `/jobs`;
    dispatch({ type: GET_JOBS_BEGIN });

    try {
      const { data } = await authFetch.get(url);
      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };

  const setEdit = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      //logoutUser()
    }
  };

  const applyJob = async (applyJobQ) => {
    dispatch({ type: APPLY_JOB_BEGIN });
    try {
      await authFetch.post("/jobApps", {
        ...applyJobQ,
      });
      dispatch({ type: APPLY_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: APPLY_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getAppliedJobs = async () => {
    dispatch({ type: GET_APPLIED_JOBS_BEGIN });
    const { appliedJobsSearch, appliedJobsSearchType, appliedJobsSort } = state;
    let url = `/jobApps?jobType=${appliedJobsSearchType}&$sort=${appliedJobsSort}`;
    if (appliedJobsSearch) {
      url = url + `&search=${appliedJobsSearch}`;
    }

    console.log(url);
    try {
      const { data } = await authFetch.get(url);
      const { AppliedJobs, AppliedTotalJobs, AppliedJobsNumOfPages } = data;

      dispatch({
        type: GET_APPLIED_JOBS_SUCCESS,
        payload: {
          AppliedJobs,
          AppliedTotalJobs,
          AppliedJobsNumOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS_APPLIED_JOBS });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        loginUserPasswordRest,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEdit,
        deleteJob,
        editJob,
        applyJob,
        getAppliedJobs,
        clearFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
