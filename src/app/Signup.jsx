import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthLayout from "../components/AuthLayout";
import logo from "../assets/logo.png";
import { TextLabelInput } from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/authService";
import Spinner from "../components/Spinner";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  return (
    <AuthLayout>
      <div>
        <img src={logo} alt="" className="logo" />
      </div>
      <div>
        <h1 className="auth_header">Get Started!</h1>
        <p className="text_sm">Glad to have you here! Create an account with us now.</p>
      </div>
      <div>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            fullName: Yup.string().required("Full name is required"),
            phoneNumber: Yup.string().required("Phone number is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(8, "Must be 8 characters or more")
              .required("Password is required"),
            confirmPassword: Yup.string()
              .required("Confirm Password is required")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
          })}
          onSubmit={async (values) => {
            setLoading(true);
            let data = {
              fullName: values.fullName,
              email: values.email,
              phoneNumber: values.phoneNumber,
              password: values.password,
            }
            const response = await signup(data);
            if (!response.error) {
              setLoading(false);
              navigate("/")
            } else {
              setLoading(false);
            //   dispatch(
            //     showToast({
            //       status: "error",
            //       message: errorHandler(response.data),
            //     })
            //   );
            }
          }}
        >
          <Form>
            <div className="input_wrap">
              <TextLabelInput
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Full name"
              />
              <TextLabelInput
                label="Email"
                name="email"
                type="email"
                placeholder="Email Address"
              />
              <TextLabelInput
                label="Phone Number"
                name="phoneNumber"
                type="text"
                placeholder="Phone number"
              />
              <TextLabelInput
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
              />
              <TextLabelInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
              />
            </div>
            <button
              className="form_btn primary_bg semibold"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Sign up"}
            </button>
          </Form>
        </Formik>
        <p className="form_text text_center">
          Already have an account?{" "}
          <Link to={"/"}><span className="secondary_text pointer semibold">Sign in</span></Link>
        </p>
      </div>
    </AuthLayout>
  );
}
