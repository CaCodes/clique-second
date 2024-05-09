import { http } from "../utils/axios";
import { getErrorData } from "../utils/utils";

export const fetchCourses = async (id) => {
    try {
      let response = await http.get("course/all-courses");
      return { error: false, data: response.data, status: response.status };
    } catch (err) {
      return getErrorData(err)
    }
  };

export const fetchCourse = async (id) => {
    try {
      let response = await http.get(`course/course-details/${id}`);
      return { error: false, data: response.data, status: response.status };
    } catch (err) {
      return getErrorData(err)
    }
  };

export const logoutUser = async (id) => {
    try {
      let response = await http.post(`user/logout-all`);
      return { error: false, data: response.data, status: response.status };
    } catch (err) {
      return getErrorData(err)
    }
  };