import { Table, Tabs, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import {
  getAdminAccount,
  getCustomerAccount,
} from "../../store/account/accountSlice";
import { customerStatus } from "../../types";
import "./style.scss";

const Account = () => {
  const dispatch = useDispatch();
  const { adminAccounts, customerAccounts, page, size, totalPage, loading } =
    useSelector((state) => state.account);
  const [currentPage, setCurrentPage] = useState(page);
  const [currentKey, setCurrentKey] = useState(1);

  const columns = [
    {
      title: "#",
      key: "index",
      render: (value, item, index) => (page - 1) * 10 + index,
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => (
        <>
          {customerStatus.map((item) => {
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
    const getCustomerAccountList = () => {
      dispatch(getCustomerAccount({ page: currentPage, size }));
    };
    const getAdminAccountList = () => {
      dispatch(getAdminAccount({ page: currentPage, size }));
    };
    console.log("currentKey", currentKey);
    if (currentKey === 2) {
      console.log("call 2");
      getAdminAccountList();
    }
    if (currentKey === 1) {
      console.log("call 1");
      getCustomerAccountList();
    }
  }, [currentKey, currentPage, dispatch, size]);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const onSearch = (value) => {
    console.log("value", value);
  };

  const handleAddNew = () => {};
  const onChangeTabs = (key) => {
    setCurrentKey(key);
  };

  const items = [
    {
      key: "1",
      label: `Customer Account`,
      children: (
        <div className="account-container">
          <div className="page-title">
            <h1>Customer</h1>
          </div>
          <div className="account-content">
            <div className="account-action">
              <CustomSearch
                placeholder="Search customer account.."
                allowClear
                onSearch={onSearch}
                width="30%"
              />
              <CustomButton onClick={handleAddNew}>Add new</CustomButton>
            </div>
            <Table
              // rowKey="citizenId"
              dataSource={customerAccounts}
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
      ),
    },
    {
      key: "2",
      label: `Admin Account`,
      children: (
        <div className="account-container">
          <div className="page-title">
            <h1>Admin</h1>
          </div>
          <div className="account-content">
            <div className="account-action">
              <CustomSearch
                placeholder="Search admin account.."
                allowClear
                onSearch={onSearch}
                width="30%"
              />
              <CustomButton onClick={handleAddNew}>Add new</CustomButton>
            </div>
            <Table
              // rowKey="citizenId"
              dataSource={adminAccounts}
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
      ),
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} onChange={onChangeTabs} />;
};

export default Account;
