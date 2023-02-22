import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import { getService } from "../../store/service/serviceSlice";
import { serviceStatus } from "../../types";
import "./style.scss";

const Service = () => {
  const dispatch = useDispatch();
  const { services, page, size, totalPage, loading } = useSelector(
    (state) => state.service
  );
  const [currentPage, setCurrentPage] = useState(page);

  const columns = [
    {
      title: "#",
      key: "index",
      render: (value, item, index) => (page - 1) * 10 + index,
    },
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
          {serviceStatus.map((item) => {
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
    const getServiceList = () => {
      dispatch(getService({ page: currentPage, size }));
    };
    getServiceList();
  }, [currentPage, dispatch, size]);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const onSearch = (value) => {
    console.log("value", value);
  };

  const handleAddNew = () => {};
  
  return (
    <div className="service-container">
      <div className="page-title">
        <h1>Service</h1>
      </div>
      <div className="service-content">
        <div className="service-action">
          <CustomSearch
            placeholder="Search service.."
            allowClear
            onSearch={onSearch}
            width="30%"
          />
          <CustomButton onClick={handleAddNew}>Add new</CustomButton>
        </div>
        <Table
          // rowKey="citizenId"
          dataSource={services}
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

export default Service;
