import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { errorHandler } from "../../utils/utils";
import { showToast } from "../../redux/slices/toastSlice";
import { fetchCourse } from "../../services/dashboardService";
import Spinner from "../../components/Spinner";
import pic from "../../assets/course-pic.jpeg";
import star from "../../assets/star.svg";
import tutor from "../../assets/tutor.jpeg";
import { Link } from "react-router-dom";

export default function CourseDetails() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({});
  const { id } = useParams();

  const getCourse = async (id) => {
    setLoading(true)
    const response = await fetchCourse(id);
    if (!response.error) {
      setLoading(false);
      setCourse(response.data.data);
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
    getCourse(id);
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <Link to={"/dashboard"}><p className="primary_text text_sm pb_xs">Back to courses</p></Link>
          <h2 className="pb_sm text_xl">{course.title}</h2>
          <div className="details_wrap custom_grid">
            <div className="course_details">
              <div className="course_details_img">
                <img src={pic} alt="" className="course_img" />
              </div>
              <div className="custom_flex custom_column gap_xs">
                <div className="mt_md">
                  <h3 className="pb_xs">Description</h3>
                  <p>
                    {course.description}
                  </p>
                </div>
                <div>
                  <h3 className="duration primary_text">
                    {course.duration}
                  </h3>
                </div>
              </div>
            </div>
            <div className="tutor_details">
              <h2 className="pb_md text_xl">Meet the tutor</h2>
              <div className="custom_align mb_md">
                <img src={tutor} alt="" className="circle_img" />
                <h4 className="">{course.tutor}</h4>
              </div>
              <div>
                <p>
                  {course.tutorDetails}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
