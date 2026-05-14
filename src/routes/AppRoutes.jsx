import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Exam from "../pages/Exam";
import Result from "../pages/Result";
import NotFound from "../pages/NotFound";
import CreateExam from "../pages/CreateExam";
import AllExams from "../pages/AllExams";
import AddQuestion from "../pages/AddQuestion";
import ResultsDashboard from "../pages/ResultsDashboard";

function AppRoutes() {

  return (

    <BrowserRouter>

      <MainLayout>

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* STUDENT DASHBOARD */}
          <Route
            path="/student-dashboard"
            element={<StudentDashboard />}
          />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />

          {/* EXAM PAGE */}
          <Route
            path="/exam/:examId"
            element={<Exam />}
          />

          {/* RESULTS */}
          <Route
            path="/result"
            element={<Result />}
          />

          {/* RESULTS DASHBOARD */}
          <Route
            path="/results-dashboard"
            element={<ResultsDashboard />}
          />

          {/* CREATE EXAM */}
          <Route
            path="/create-exam"
            element={<CreateExam />}
          />

          {/* ALL EXAMS */}
          <Route
            path="/all-exams"
            element={<AllExams />}
          />

          {/* ADD QUESTION */}
          <Route
            path="/add-question/:examId"
            element={<AddQuestion />}
          />

          {/* NOT FOUND */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </MainLayout>

    </BrowserRouter>

  );

}

export default AppRoutes;