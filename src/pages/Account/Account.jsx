import {
  Modal,
  Table,
  Tabs,
  Tag,
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  DatePicker,
  Space,
  Radio,
} from "antd";

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
const { Option } = Select;
const Account = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { adminAccounts, customerAccounts, page, size, totalPage, loading } =
    useSelector((state) => state.account);
  const [currentPage, setCurrentPage] = useState(page);
  const [currentKey, setCurrentKey] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      title: "#",
      key: "index",
      render: (value, item, index) => (page - 1) * 10 + index,
    },
    {
      title: "",
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

  const onChangeTabs = (key) => {
    setCurrentKey(key);
  };

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const onCreateCustomerAccount = (value) => {};
  const handleCancel = () => {
    setIsModalOpen(false);
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

  // const formItemLayout = {
  //   labelCol: {
  //     xs: {
  //       span: 24,
  //     },
  //     sm: {
  //       span: 8,
  //     },
  //   },
  //   wrapperCol: {
  //     xs: {
  //       span: 24,
  //     },
  //     sm: {
  //       span: 16,
  //     },
  //   },
  // };
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChangeTabs} />
      <Modal
        title="Create customer account"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Create"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreateCustomerAccount(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          name="create-customer-form"
          layout="vertical"
          autoComplete="off"
          style={{
            width: "100%",
          }}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: " is required.",
              },
            ]}
          >
            <Input placeholder="" className="custom-input" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "Email is not valid.",
              },
            ]}
          >
            <Input placeholder="Email (Optional)" className="custom-input" />
          </Form.Item>
          <Space size="large">
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "Phone is required.",
                },
              ]}
            >
              <Input placeholder="Phone" className="custom-input" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password is required.",
                },
              ]}
            >
              <Input
                placeholder="Password"
                type="password"
                className="custom-input"
              />
            </Form.Item>
          </Space>
          <Space size="large">
              <Form.Item name="gender" label="Gender">
                <Radio.Group>
                  <Radio value="MALE">Male</Radio>
                  <Radio value="FEMALE">Female</Radio>
                  <Radio value="OTHER">Other</Radio>
                </Radio.Group>
              </Form.Item>
            <Form.Item
              name="dateOfBirth"
              label="Date of birth"
              rules={[
                {
                  required: true,
                  message: "DOB is required.",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Space>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Address is required.",
              },
            ]}
          >
            <Input placeholder="Address" className="custom-input" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Account;
