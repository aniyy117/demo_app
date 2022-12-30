import React from "react";
import ReplayIcon from "@mui/icons-material/Replay";

interface RetryProps {
  onClick: any;
}
const Retry = (props: RetryProps) => {
  const { onClick } = props;
  return (
    <div
      className="retry"
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center",
        height: "100%",
        cursor: "pointer",
      }}
    >
      <ReplayIcon sx={{ fontSize: 50, width: "100%" }}/>
      <h1>Server Error</h1>
      <p>Please Try agin</p>
    </div>
  );
};

export default Retry;
