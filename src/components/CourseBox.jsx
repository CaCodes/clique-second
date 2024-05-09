import React from "react";
import pic from "../assets/tutor.jpeg";
import courseImg from "../assets/course-pic.jpeg";
import { Link } from "react-router-dom";
import { shortenSentence } from "../utils/utils";

export default function CourseBox({data}) {
  return (
    <div className="course_box">
      <div className="course_img_wrap">
        <img src={courseImg} alt="" className="course_img" />
      </div>
      <div className="course_box_text_wrap">
        <Link to={`/dashboard/${data._id}`}><h3>{data.title}</h3></Link>
        <p className="text_sm">
        {shortenSentence(data.description, 60)}
        </p>
        <div className="mt_md custom_between semibold">
          <div className="custom_align">
            <img src={pic} alt="" className="circle_img_sm" />
            <p className="text_sm">{data.tutor}</p>
          </div>
          <div>
            <h3 className="duration text_right primary_text">{data.duration}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
