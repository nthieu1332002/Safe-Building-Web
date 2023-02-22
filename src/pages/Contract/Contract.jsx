import {
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import moment from 'moment';

import "./style.scss";

import { getContract, postContract } from "../../store/contract/contractSlice";

import CustomButton from "../../components/CustomButton/CustomButton";

import CustomSearch from "../../components/CustomSearch/CustomSearch";

import "./style.scss";
import { rentContractStatus } from "../../types";

const Contract = () => {
  const dispatch = useDispatch();
  const { contracts, page, size, totalPage, loading } = useSelector(
    (state) => state.contract
  );
  const [currentPage, setCurrentPage] = useState(page);
  const columns = [
    {
      title: "#",
      key: "index",
      render: (value, item, index) => (page - 1) * 10 + index,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Room",
      dataIndex: "roomNumber",
      key: "roomNumber",
      sorter: (a, b) => a.roomNumber - b.roomNumber,
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Building",
      dataIndex: "buildingName",
      key: "buildingName",
      sorter: (a, b) => a.buildingName.localeCompare(b.buildingName),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Expiration Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      sorter: (a, b) => moment(a.expiryDate).unix() - moment(b.expiryDate).unix(),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => (
        <>
          {rentContractStatus.map((item) => {
            return (
              <>
                {item.status === text ? (
                  <Tag className="tag" color={item.color}>
                    {text}
                  </Tag>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </>
      ),
    },
  ];

  useEffect(() => {
    const getContractList = () => {
      dispatch(getContract({ page: currentPage, size }));
    };
    getContractList();
  }, [currentPage, dispatch, size]);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const onSearch = (value) => {
    console.log("value", value);
  };

  const handleAddNew = () => {};

  return (
    <div className="contract-container">
      <div className="page-title">
        <h1>Contract</h1>
      </div>
      <div className="contract-content">
        <div className="contract-action">
          <CustomSearch
            placeholder="Search contract.."
            allowClear
            onSearch={onSearch}
            width="30%"
          />
          <CustomButton onClick={handleAddNew}>Add new</CustomButton>
        </div>
        <Table
          // rowKey="citizenId"
          dataSource={contracts}
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

export default Contract;
