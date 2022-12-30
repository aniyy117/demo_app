// react
import React, { useState, useEffect } from "react";

// vendors
import { useFormik } from "formik";
import * as yup from "yup";
import classnames from "classnames";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
// services

// redux
// ui-components
// others
// scss
import "./LoginPage.scss";

// lazy
// interfaces and types

// core
import { TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { AUTH } from "../../services/auth";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/storeConfigurations";
import { login } from "../../Redux/Slice/login.slice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ADMIN } from "../../services/admin.service";

const validationSchema = yup.object({
  user_name: yup.string().required("No User Name provided."),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const validationSchemaSignUp = yup.object({
  user_name: yup.string().required("No User Name provided."),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  email: yup.string().email("Invalid email address").required("Required"),
});

const LoginPage = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  //redirect if already logged in
  useEffect(() => {
    AUTH.isLoggedIn ? history.push("/landing") : history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { url } = useRouteMatch();

  const formik = useFormik({
    initialValues: {
      user_name: "",
      password: "",
      rememberMe: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const addingSessionTime = {
        ...values,
        session: moment().add(24, "hours").format("MMMM Do YYYY, h:mm:ss a"),
        theme: theme.darkTheme,
      };
      setSubmitting(true);
      AUTH.login(addingSessionTime)
        .then((res) => {
          setSubmitting(false);
          dispatch(login());
        })
        .catch((err) => {
          ADMIN.toast.error(err);
          setSubmitting(false);
        });
    },
  });

  const formikSignUp = useFormik({
    initialValues: {
      user_name: "",
      password: "",
      email: "",
    },
    validationSchema: validationSchemaSignUp,
    onSubmit: (values) => {
      setSubmitting(true);
      AUTH.register(values)
        .then((res) => {
          setSubmitting(false);
          ADMIN.toast.success("User Created");
          window.location.replace("#/");
        })
        .catch((err) => {
          ADMIN.toast.error(err);
          setSubmitting(false);
        });
    },
  });

  const formData = () => {
    return (
      <form onSubmit={formik.handleSubmit} className="ui form login-form">
        <div className="input-container">
          <AccountCircleIcon sx={{ fontSize: 300, width: "100%" }} />
          <div
            className={classnames(
              "ui input fluid icon login-form--input-container",
              { error: formik.touched.user_name && !!formik.errors.user_name }
            )}
          >
            <TextField
              sx={{ mb: 2, width: "100%" }}
              id="user_name"
              name="user_name"
              label="User Name"
              value={formik.values.user_name}
              onChange={formik.handleChange}
              variant="standard"
              size="small"
              error={
                formik.touched.user_name && Boolean(formik.errors.user_name)
              }
              helperText={formik.touched.user_name && formik.errors.user_name}
            />
          </div>

          <div
            className={classnames(
              "ui input fluid icon login-form--input-container",
              { error: formik.touched.password && !!formik.errors.password }
            )}
          >
            <TextField
              sx={{ mb: 4, width: "100%" }}
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              variant="standard"
              size="small"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
        </div>
        <div className="btn-group">
          <LoadingButton
            type="submit"
            sx={{ mb: 4, fontWeight: "600", width: "100%" }}
            variant="contained"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Connect
          </LoadingButton>
        </div>
        <div className="signup">
          <Typography>
            Are you a new user ?
            <NavLink to="/signup" className="signup-link">
              {" "}
              Sign Up
            </NavLink>
          </Typography>
        </div>
      </form>
    );
  };

  const formDataSignUP = () => {
    return (
      <form onSubmit={formikSignUp.handleSubmit} className="ui form login-form">
        <div className="input-container">
          <AccountCircleIcon sx={{ fontSize: 200, width: "100%" }} />
          <div
            className={classnames(
              "ui input fluid icon login-form--input-container",
              {
                error:
                  formikSignUp.touched.user_name &&
                  !!formikSignUp.errors.user_name,
              }
            )}
          >
            <TextField
              sx={{ mb: 2, width: "100%" }}
              id="user_name"
              name="user_name"
              label="User Name"
              value={formikSignUp.values.user_name}
              onChange={formikSignUp.handleChange}
              variant="standard"
              size="small"
              error={
                formikSignUp.touched.user_name &&
                Boolean(formikSignUp.errors.user_name)
              }
              helperText={
                formikSignUp.touched.user_name && formikSignUp.errors.user_name
              }
            />
          </div>
          <div
            className={classnames(
              "ui input fluid icon login-form--input-container",
              {
                error:
                  formikSignUp.touched.email && !!formikSignUp.errors.email,
              }
            )}
          >
            <TextField
              sx={{ mb: 2, width: "100%" }}
              id="email"
              name="email"
              label="Email"
              value={formikSignUp.values.email}
              onChange={formikSignUp.handleChange}
              variant="standard"
              size="small"
              error={
                formikSignUp.touched.email && Boolean(formikSignUp.errors.email)
              }
              helperText={
                formikSignUp.touched.email && formikSignUp.errors.email
              }
            />
          </div>
          <div
            className={classnames(
              "ui input fluid icon login-form--input-container",
              {
                error:
                  formikSignUp.touched.password &&
                  !!formikSignUp.errors.password,
              }
            )}
          >
            <TextField
              sx={{ mb: 4, width: "100%" }}
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formikSignUp.values.password}
              onChange={formikSignUp.handleChange}
              variant="standard"
              size="small"
              error={
                formikSignUp.touched.password &&
                Boolean(formikSignUp.errors.password)
              }
              helperText={
                formikSignUp.touched.password && formikSignUp.errors.password
              }
            />
          </div>
        </div>
        <div className="btn-group">
          <LoadingButton
            type="submit"
            sx={{ mb: 4, fontWeight: "600", width: "100%" }}
            variant="contained"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Connect
          </LoadingButton>
        </div>
        <div className="signup">
          <Typography>
            Already existing user ?
            <NavLink to="/" className="signup-link">
              {" "}
              Sign In
            </NavLink>
          </Typography>
        </div>
      </form>
    );
  };

  return <>{url.includes("signup") ? formDataSignUP() : formData()}</>;
};

export default LoginPage;
