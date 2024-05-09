import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import Signup from "./app/Signup";
import Dashboard from "./app/dashboard/Dashboard";
import DashboardHome from "./app/dashboard/DashboardHome";
import CourseDetails from "./app/dashboard/CourseDetails";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
            <Route path=":id" element={<CourseDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
