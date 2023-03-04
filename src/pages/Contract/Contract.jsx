import {
  Table,
  Tag,
  Form,
  Input,
  Button,
  Modal
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
import { rentContractStatus } from "../../ultis/types";

const firebaseEndpoint = process.env.REACT_APP_FIREBASE_ENDPOINT
const Contract = () => {

  console.log(process.env.REACT_APP_FIREBASE_ENDPOINT)

  const onFinish = (values) => {
    console.log('Success:', values);
  };

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
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <b>{text}</b>,
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
      title: "Rent-Contract Link",
      dataIndex: "rentContractLink",
      key: "rentContractLink",
      render: (text) => <b>{`${firebaseEndpoint}${text}`}</b>,
    },
    {
      title: "customerId",
      dataIndex: "customerId",
      key: "customerId",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "flatId",
      dataIndex: "flatId",
      key: "flatId",
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  // Handle file upload event and update state
  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};
  const sendInfo = ( ) => {

    const formData = new FormData();

    formData.append('File', selectedFile);


    dispatch(
      postContract({ file: selectedFile, customerId: form.getFieldValue('customer-id'), flatId : form.getFieldValue('flat-id'), rentContractId : form.getFieldValue("contract-id") } )
    );
  };
  const [form] = Form.useForm();
  const reader = new FileReader();
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
          <CustomButton onClick={showModal}>Add new</CustomButton>
          
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer ={null}
      >
        <Form
         form={form}
          name="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinish}
          autoComplete="off"
          encType="multipart/form-data"
          style={{
            width: "100%",
          }}
        >
          <Form.Item
            name="customer-id"
            rules={[
              {
                required: true,
                message: "Customer ID is required.",
              },
            ]}
          >
            <Input placeholder="Customer ID" className="custom-input" />
          </Form.Item>
          <Form.Item
            name="flat-id"
            rules={[
              {
                required: true,
                message: "Flat ID is required",
              },
            ]}
          >
            <Input placeholder="Flat ID" className="custom-input" />
          </Form.Item>
          <Form.Item
            name="contract-id"
            rules={[
              {
                required: true,
                message: "Contract ID is required",
              },
            ]}
          >
            <Input placeholder="Contract ID" className="custom-input" />
          </Form.Item>
          <Form.Item
            name="upload-file"

            rules={[
              {
                required: true,
                message: "Contract File is required",
              },
            ]}
          >
           <Input type="file" name="file" onChange={changeHandler} />

          </Form.Item>
          <Form.Item

    >
      <Button type="primary" htmlType="submit" onClick={sendInfo}>
        Submit
      </Button>
    </Form.Item>
        </Form>
      </Modal>
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
