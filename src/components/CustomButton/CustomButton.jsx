import { PlusOutlined } from "@ant-design/icons";

import React from "react";
import "./style.scss";

const CustomButton = ({ onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      <PlusOutlined />
      Add new
    </button>
  );
};

export default CustomButton;
