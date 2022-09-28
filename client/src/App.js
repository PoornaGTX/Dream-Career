import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  AllUsers,
  AdminUpdateUser,
} from "./pages/dashboard";

function App() {
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
          <Route index element={<AdminStats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
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
