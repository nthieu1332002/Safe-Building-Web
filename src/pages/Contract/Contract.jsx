import { Table, Tag, Form, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import moment from "moment";
import { FilePdfTwoTone } from "@ant-design/icons";

import "./style.scss";

import { getContract } from "../../store/contract/contractSlice";

import CustomSearch from "../../components/CustomSearch/CustomSearch";

import { rentContractStatus } from "../../ultis/types";
import CustomAction from "../../components/CustomAction/CustomAction";
const { Text } = Typography;

const firebaseEndpoint = process.env.REACT_APP_FIREBASE_ENDPOINT;
const Contract = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const dispatch = useDispatch();
  const { contracts, page, size, totalPage, loading } = useSelector(
    (state) => state.contract
  );
  const [currentPage, setCurrentPage] = useState(page);
  const [ellipsis, setEllipsis] = useState(true);

  const columns = [
    {
      title: "#",
      key: "index",
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: "Contract",
      dataIndex: ["title", "rentContractLink"],
      // key: "rentContractLink",
      render: (text, record) => (
        <b>
          <a
            target="_blank"
            href={`${firebaseEndpoint}${record.rentContractLink}`}
          >
            <Text
              ellipsis={{ tooltip: `${record.title}` }}
              style={ellipsis ? { width: 250 } : undefined}
            >
              <FilePdfTwoTone /> {record.title}
            </Text>
          </a>
        </b>
      ),
    },
    {
      title: "Resident",
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
      sorter: (a, b) =>
        moment(a.expiryDate).unix() - moment(b.expiryDate).unix(),
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
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        return (
          <CustomAction
            type="contract"
            // onClickEdit={() => onClickEdit(record)}
            // onClickDetail={() => onClickDetail(record)}
          />
        );
      },
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
          {/* <CustomButton onClick={showModal}>Add new</CustomButton> */}
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
