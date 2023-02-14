import { Pagination, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

import { getResident } from "../../store/resident/residentSlice";
import "./style.scss";

const columns = [
  {
    title: "Building",
    dataIndex: "buildingName",
    key: "buildingName",
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Citizen Id",
    dataIndex: "citizenId",
    key: "citizenId",
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Full name",
    dataIndex: "fullname",
    key: "fullname",
    sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Room",
    dataIndex: "roomNumber",
    key: "roomNumber",
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
    render: (text) => (
      <Tag className="tag" color={text === "ACTIVE" ? "green" : "red"}>{text}</Tag>
    ),
  },
];

const Resident = () => {
  const dispatch = useDispatch();
  const { residents, page, size, totalPage, loading } = useSelector(
    (state) => state.resident
  );
  const [currentPage, setCurrentPage] = useState(page);
  console.log("residents", residents);
  useEffect(() => {
    const getResidentList = () => {
      dispatch(getResident({ page: currentPage, size }));
    };
    getResidentList();
  }, [currentPage, dispatch, size]);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const onSearch = (value) => {
    console.log("value", value);
  };

  return (
    <div className="resident-container">
      <div className="page-title">
        <h1>Resident</h1>
      </div>
      <div className="resident-content">
        <Table
          dataSource={residents}
          columns={columns}
          pagination={false}
          loading={loading}
        />

        <CustomPagination
          onChange={onChange}
          currentPage={currentPage}
          totalPage={totalPage}
        />

      </div>
    </div>
  );
};

export default Resident;
