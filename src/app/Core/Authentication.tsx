// react
import React from "react";

// vendors
import { connect } from "react-redux";
import { ADMIN } from "../services/admin.service";
import { AUTH } from "../services/auth";
import { clear } from "../ui-componets/utils/storage";
import Static from "./static/Static";

// scss

interface AuthenticationProps {
  type?: "error" | "empty";
  resetAll: () => void;
  children: React.ReactNode;
}

const Authentication: React.FC<AuthenticationProps> = (props) => {
  const { type = "empty", children, resetAll } = props;
  let component;
  if (AUTH.isLoggedIn) {
    if (AUTH.isSessionTimedOut) {
      AUTH.logout(resetAll);
      window.location.replace("/");
      clear.call(localStorage);
      ADMIN.toast.error("Session timed out");
      component = null;
    } else {
      component = children;
    }
  } else if (type === "error") {
    component = <Static page="unauthorized" />;
  } else {
    component = null;
  }
  return <>{component}</>;
};

export default connect(null, (dispatch: Function) => ({
  resetAll: () => dispatch({ type: "RESET_ALL" }),
}))(Authentication);
