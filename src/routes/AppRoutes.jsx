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

function AppRoutes() {

  return (

    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/student-dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/exam"
            element={<Exam />}
          />

          <Route
            path="/result"
            element={<Result />}
          />

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