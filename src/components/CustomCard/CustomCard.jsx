import React from "react";
import "./style.scss";

const CustomCard = ({ height, width, children }) => {
  return (
    <div className="custom-card" style={{ width: width, height: height }}>
      {children}
    </div>
  );
};

export default CustomCard;
