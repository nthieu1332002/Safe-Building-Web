import {
  Pagination,
  Table,
  Tag,
  Button,
 
  message,
  Form,
  Modal,
  Input,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

import { getResident } from "../../store/resident/residentSlice";
import "./style.scss";

import { postContract } from "../../store/contract/contractSlice";
const columns = [
  {
    title: "Building",
    dataIndex: "buildingName",
    key: "buildingName",
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Room",
    dataIndex: "roomNumber",
    key: "roomNumber",
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Full Name",
    dataIndex: "fullname",
    key: "fullname",
    sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Expiry Date",
    dataIndex: "expiry_date",
    key: "expiry_date",
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
    render: (text) => (
      <Tag className="tag" color={text === "ACTIVE" ? "green" : "red"}>
        {text}
      </Tag>
    ),
  },

  {
    title: "Detail",
    dataIndex: "detail",
    key: "detail",
    render: (text) => <b>{text}</b>,
  },
];

const Contract = () => {

  
   
  
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

  const props = {
    name: "file",
    action: "",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
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
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  
  // progress
  
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
        <h1>Resident</h1>
      </div>

      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
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
      <div className="contract-content">
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

export default Contract;
