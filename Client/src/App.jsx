import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoutes";

// 🔥 Lazy imports
const AuthLayout = lazy(() => import("./components/Auth/AuthLayout"));
const SignUpPage = lazy(() => import("./components/Auth/SignUpPage"));
const LogInPage = lazy(() => import("./components/Auth/LogInPage"));
const AdminLogin = lazy(() => import("./components/Auth/AdminLogin"));

const AdminDashboard = lazy(() => import("./components/AdminDashboard/AdminDashboard"));
const JobDashboard = lazy(() => import("./components/Jobs/JobDashboard"));
const Applications = lazy(() => import("./components/Jobs/Applications"));
const BranchData = lazy(() => import("./components/Departments/BranchData"));

const StudentDashboard = lazy(() => import("./components/Student/StudentDashboard"));
const StudentProfile = lazy(() => import("./components/Student/StudentProfile"));

const ErrorPage = lazy(() => import("./components/ErrorPage"));

function App() {
  return (
    <>
      <Suspense >
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<SignUpPage />} />
            <Route path="login" element={<LogInPage />} />
            <Route path="admin" element={<AdminLogin />} />
          </Route>

          <Route
            path="/admindashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobdashboard"
            element={
              <ProtectedRoute role="admin">
                <JobDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/:jobId"
            element={
              <ProtectedRoute role="admin">
                <Applications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/branch/:branchName"
            element={
              <ProtectedRoute role="admin">
                <BranchData />
              </ProtectedRoute>
            }
          />

          <Route
            path="/studentdashboard"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/studentprofile"
            element={
              <ProtectedRoute role="student">
                <StudentProfile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>

      <ToastContainer />
    </>
  );
}

export default App;