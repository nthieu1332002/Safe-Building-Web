import { Drawer, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import {
  getResident,
  getResidentById,
} from "../../store/resident/residentSlice";
import "./style.scss";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import CustomButton from "../../components/CustomButton/CustomButton";
import { customerStatus } from "../../ultis/types";
import CustomAction from "../../components/CustomAction/CustomAction";
import ResidentFormAdd from "../../components/ResidentForm/ResidentFormAdd";
import ResidentFormDetail from "../../components/ResidentForm/ResidentFormDetail.jsx";
import ResidentFormEdit from "../../components/ResidentForm/ResidentFormEdit";

const Resident = () => {
  const dispatch = useDispatch();
  const { residents, residentDetail, page, size, totalPage, loading } =
    useSelector((state) => state.resident);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);

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
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
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
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        return (
          <CustomAction
            type="resident"
            onClickEdit={() => onClickEdit(record)}
            onClickDetail={() => onClickDetail(record)}
          />
        );
      },
    },
  ];
  const getResidentList = () => {
    dispatch(getResident({ page: currentPage, size }));
  };

  useEffect(() => {
    getResidentList();
  }, [currentPage, dispatch, size]);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const onSearch = (value) => {
    console.log("value", value);
  };

  const onClickEdit = (record) => {
    dispatch(getResidentById({ id: record.id }));
    setIsModalEditOpen(true);
  };
  const onClickDetail = (record) => {
    dispatch(getResidentById({ id: record.id }));
    setIsModalDetailOpen(true);
  };
  return (
    <>
      <div className="resident-container">
        <div className="page-title">
          <h1>Resident</h1>
        </div>
        <div className="resident-content">
          <div className="resident-action">
            <CustomSearch
              placeholder="Search resident.."
              allowClear
              onSearch={onSearch}
              width="30%"
            />
            <CustomButton onClick={() => setIsModalAddOpen(true)}>
              Add new
            </CustomButton>
          </div>
          <Table
            // rowKey="citizenId"
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
      <ResidentFormAdd
        loading={loading}
        isModalOpen={isModalAddOpen}
        setIsModalDetailOpen={setIsModalDetailOpen}
        handleSubmit={getResidentList}
        handleCancel={() => setIsModalAddOpen(false)}
      />
      <ResidentFormEdit
        dispatch={dispatch}
        loading={loading}
        isModalOpen={isModalEditOpen}
        setIsModalEditOpen={setIsModalEditOpen}
        handleSubmit={getResidentList}
        handleCancel={() => setIsModalEditOpen(false)}
        item={residentDetail}
      />
      <ResidentFormDetail
        onClose={() => setIsModalDetailOpen(false)}
        open={isModalDetailOpen}
        customer={residentDetail}
      />
    </>
  );
};

export default Resident;
