import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import { getBuilding } from "../../store/building/buildingSlice";
import { buildingStatus } from "../../types";
import "./style.scss";

const Building = () => {
  const dispatch = useDispatch();
  const { buildings, page, size, totalPage, loading } = useSelector(
    (state) => state.building
  );
  const [currentPage, setCurrentPage] = useState(page);
  const columns = [
    {
      title: "#",
      key: "index",
      render: (value, item, index) => (page - 1) * 10 + index,
    },
    {
      title: "Building name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => (
        <>
          {buildingStatus.map((item) => {
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
    const getBuildingList = () => {
      dispatch(getBuilding({ page: currentPage, size }));
    };
    getBuildingList();
  }, [currentPage, dispatch, size]);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const onSearch = (value) => {
    console.log("value", value);
  };

  const handleAddNew = () => {};

  return (
    <div className="building-container">
      <div className="page-title">
        <h1>Building</h1>
      </div>
      <div className="building-content">
        <div className="building-action">
          <CustomSearch
            placeholder="Search building.."
            allowClear
            onSearch={onSearch}
            width="30%"
          />
          <CustomButton onClick={handleAddNew}>Add new</CustomButton>
        </div>
        <Table
          // rowKey="citizenId"
          dataSource={buildings}
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

export default Building;
