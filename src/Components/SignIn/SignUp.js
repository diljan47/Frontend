import React, { useEffect } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import SignWeb from "../../images/SignWeb.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/user/userSlice";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const signupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email should be valid"),
  mobile: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  password: Yup.string().required("Password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
    validationSchema: signupSchema,
  });

  useEffect(() => {
    if (authState.isSuccess) {
      navigate("/signin");
    }
  }, [authState.isSuccess, navigate]);

  return (
    <header className="signup-cont">
      <Link to={"/"}>
        <div className="logo-web">Ecom</div>
      </Link>
      <section className="signup-img-cont">
        <img src={SignWeb} alt="" className="signup-img" />
        <div className="signup-sec">
          <form className="signup-sec-col" onSubmit={formik.handleSubmit}>
            <span className="signup-title">Sign Up</span>
            <input
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="formik-error">
              {formik.touched.name && formik.errors.name}
            </span>
            <input
              placeholder="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="formik-error">
              {formik.touched.email && formik.errors.email}
            </span>
            <input
              placeholder="Mobile Number"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="formik-error">
              {formik.touched.mobile && formik.errors.mobile}
            </span>
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />{" "}
            <span className="formik-error">
              {formik.touched.password && formik.errors.password}
            </span>
            <button type="submit" className="signup-btn">
              <span className="signup-text">Sign Up</span>
            </button>
          </form>
          <div className="login-ext">
            <span> already have an account? </span>
            <Link to={"/signin"}>
              <span className="login-name"> Login</span>
            </Link>
          </div>
        </div>
      </section>
    </header>
  );
};

export default SignUp;
