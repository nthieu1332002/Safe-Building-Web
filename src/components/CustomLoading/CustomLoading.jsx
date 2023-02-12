import React from "react";
import { Spin } from "antd";
import "./style.scss";

const CustomLoading = () => {
  return (
    <div className="custom-loading">
      <Spin size="large" />
    </div>
  );
};

export default CustomLoading;
