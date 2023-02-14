import { Pagination } from "antd";
import React from "react";
import "./style.scss"

const CustomPagination = ({
  onChange,
  currentPage,
  totalPage,
}) => {
  return (
    <div className="custom-pagination">
      <Pagination
        defaultPageSize={1}
        onChange={onChange}
        current={currentPage}
        total={totalPage}
      />
    </div>
  );
};

export default CustomPagination;
