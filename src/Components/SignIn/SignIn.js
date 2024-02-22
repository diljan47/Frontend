import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import SignWeb from "../../images/SignWeb.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const signInSchema = Yup.object({
  email: Yup.string().email().required("Email should be valid"),
  password: Yup.string().required("Password is required"),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
    validationSchema: signInSchema,
  });

  useEffect(() => {
    if (authState.user !== "" && authState.isSuccess === true) {
      navigate("/");
    }
  }, [authState, navigate]);

  return (
    <header className="login-cont">
      <Link to={"/"}>
        <div className="logo-web">Ecom</div>
      </Link>
      <section className="login-img-cont">
        <img src={SignWeb} alt="" className="login-img" />
        <div className="login-sec">
          <form className="login-sec-col" onSubmit={formik.handleSubmit}>
            <span className="login-title">Sign In</span>
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
              placeholder="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="formik-error">
              {formik.touched.password && formik.errors.password}
            </span>
            <button type="submit" className="login-btn">
              <span className="signin-text">Sign In</span>
            </button>
          </form>
          <div className="login-ext">
            <span> already have an account? </span>
            <Link to={"/signup"}>
              <span className="login-name"> Signup</span>
            </Link>
          </div>
        </div>
      </section>
    </header>
  );
};

export default SignIn;
