import { Select } from "antd";
import React from "react";

const CustomSelect = ({ title, options, suffixIcon, onChange }) => {
  return (
    <>
      <Select
        suffixIcon={suffixIcon}
        defaultValue={title}
        style={{
          width: 120,
        }}
        onChange={onChange}
        options={options}
      />
    </>
  );
};

export default CustomSelect;
