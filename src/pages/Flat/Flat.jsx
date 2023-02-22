import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import { getFlat } from "../../store/flat/flatSlice";
import { flatStatus } from "../../types";
import "./style.scss";

const Flat = () => {
  const dispatch = useDispatch();
  const { flats, page, size, totalPage, loading } = useSelector(
    (state) => state.flat
  );
  const [currentPage, setCurrentPage] = useState(page);
  const columns = [
    {
      title: "#",
      key: "index",
      render: (value, item, index) => (page - 1) * 10 + index,
    },
    {
      title: "Building",
      dataIndex: "buildingName",
      key: "buildingName",
      sorter: (a, b) => a.buildingName.localeCompare(b.buildingName),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Room number",
      dataIndex: "roomNumber",
      key: "roomNumber",
      sorter: (a, b) => a.roomNumber - b.roomNumber,
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Flat type",
      dataIndex: "flatType",
      key: "flatType",
      sorter: (a, b) => a.flatType.localeCompare(b.flatType),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => (
        <>
          {flatStatus.map((item) => {
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
    const getFlatList = () => {
      dispatch(getFlat({ page: currentPage, size }));
    };
    getFlatList();
  }, [currentPage, dispatch, size]);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const onSearch = (value) => {
    console.log("value", value);
  };

  const handleAddNew = () => {};

  return (
    <div className="flat-container">
      <div className="page-title">
        <h1>Flat</h1>
      </div>
      <div className="flat-content">
        <div className="flat-action">
          <CustomSearch
            placeholder="Search flat.."
            allowClear
            onSearch={onSearch}
            width="30%"
          />
          <CustomButton onClick={handleAddNew}>Add new</CustomButton>
        </div>
        <Table
          // rowKey="citizenId"
          dataSource={flats}
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

export default Flat;
