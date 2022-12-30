import React from "react";

interface NoDataProps {
  onClick: any;
  message: string;
  subMessage?: string;
  icon: any;
}
const NoData = (props: NoDataProps) => {
  const { onClick, icon, message  , subMessage} = props;
  return (
    <div
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
      {icon}
      <h1>{message}</h1>
      <p>{subMessage}</p>
    </div>
  );
};

export default NoData;
