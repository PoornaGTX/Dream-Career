import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/appContext";
import {
  Landing,
  Error,
  Register,
  FrogetPassword,
  ProtectedRoute,
  PasswordRest,
} from "./pages"; //this is export from index.js in pages
import {
  AddJob,
  AllJobs,
  Profile,
  AdminStats,
  SharedLayout,
  ApplyJob,
  AppliedJobs,
  JobRequests,
  RecStats,
  EditJobApp,
  AllUsers,
  AdminUpdateUser,
  Stats,
} from "./pages/dashboard";
function App() {
  const { user } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          {user?.type === "Applicant" && <Route index element={<Stats />} />}
          {user?.type === "Admin" && <Route index element={<AdminStats />} />}
          {user?.type === "Recruiter" && (<Route index element={<RecStats />} />)}
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="/edit-app-job" element={<EditJobApp />} />
          <Route path="profile" element={<Profile />} />
          <Route path="apply-job" element={<ApplyJob />} />
          <Route path="applied-jobs" element={<AppliedJobs />} />
          <Route path="job-requests" element={<JobRequests />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="admin-update" element={<AdminUpdateUser />} />
        </Route>

        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/frogetpassword" element={<FrogetPassword />} />
        <Route path="/reset-password/:id/:token" element={<PasswordRest />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
