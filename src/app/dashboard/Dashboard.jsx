import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import userPic from "../../assets/user.jpeg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteCookie } from "../../utils/utils";
import { logoutUser } from "../../services/dashboardService";

export default function Dashboard() {
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);
  const logout = async () => {
    deleteCookie("cl_tag")
    const response = await logoutUser()
    navigate("/")
  }
  return (
    <div className="gray_b custom_screen">
      <div className="dashboard_nav custom_align">
        <div className="width_max padding_wrap custom_flex custom_between">
          <div>
            {/* logo */}
            <Link to={"/"}>
              <img src={logo} alt="logo" className="logo_bg" />
            </Link>
          </div>
          <div className="custom_align gap_md">
            <Link target="_blank" to={"https://google.com"}><p className="semibold sm_hidden">My Courses</p></Link>
            <div className="custom_align name_card">
              {/* Profile pic */}
              <img src={userPic} alt="user dp" className="circle_img md_hidden" onClick={() => setShowDropdown(!showDropdown)} />
              <img src={userPic} alt="user dp" className="circle_img sm_hidden" />
              <div className="sm_hidden">
                <p className="semibold capitalize">{user.fullName}</p>
                <p className="text_xs">{user.email}</p>
                <p onClick={logout} className="text_xs logout_text secondary_text">Logout</p>
              </div>
            </div>
            {showDropdown && <div className="dropdown md_hidden">
              <Link target="_blank" to={"https://google.com"}><p className="dropdown_text">My Courses</p></Link>
              <p className="dropdown_text" onClick={logout}>Logout</p>
              <div className="custom_align name_card_sm">
                {/* Profile pic */}
                <img src={userPic} alt="user dp" className="circle_img" />
                <div className="">
                  <p className="semibold capitalize">{user.fullName}</p>
                  <p className="text_xs">{user.email}</p>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
      <div className="width_max padding_wrap">
        <Outlet />
      </div>
    </div>
  );
}
