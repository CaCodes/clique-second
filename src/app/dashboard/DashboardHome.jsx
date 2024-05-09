import React, { useEffect, useState } from "react";
import CourseBox from "../../components/CourseBox";
import { useDispatch, useSelector } from "react-redux";
import { errorHandler, getFirstWord } from "../../utils/utils";
import { fetchCourses } from "../../services/dashboardService";
import Spinner from "../../components/Spinner";
import { showToast } from "../../redux/slices/toastSlice";

export default function DashboardHome() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const getCourses = async () => {
    setLoading(true);
    const response = await fetchCourses();
    if (!response.error) {
      setLoading(false);
      setCourses(response.data.data);
    } else {
      setLoading(false);
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
    }
  };

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div className="dashboard_home">
      <div className="mb_md">
        <h2 className="capitalize">Welcome {getFirstWord(user.fullName)} 😃</h2>
        <p>What will you be learning today?</p>
      </div>
      {loading ? (
        <div className="mt_md">
          <Spinner />
        </div>
      ) : (
        <div>
          {courses.length > 0 ? (
            <div className="courses_wrap custom_grid">
              {courses.map((item, index) => (
                <div key={index}>
                  <CourseBox data={item} />
                </div>
              ))}
            </div>
          ) : (
            <p>No courses yet</p>
          )}
        </div>
      )}
    </div>
  );
}
