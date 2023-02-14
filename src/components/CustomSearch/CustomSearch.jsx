import React from "react";
import { Input, Space } from 'antd';
import "./style.scss";

const { Search } = Input;

const CustomSearch = ({placeholder, onSearch, width}) => {
  return (
    <div className="custom-search" style={{ width: width }}>
      <Search placeholder={placeholder} allowClear onSearch={onSearch} size="large"/>
    </div>
  );
};

export default CustomSearch;
