import { Table, Tag } from "antd";
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
import { customerStatus, sortOption } from "../../ultis/types";
import CustomAction from "../../components/CustomAction/CustomAction";
import ResidentFormAdd from "../../components/Form/ResidentForm/ResidentFormAdd";
import ResidentFormDetail from "../../components/Form/ResidentForm/ResidentFormDetail.jsx";
import ResidentFormEdit from "../../components/Form/ResidentForm/ResidentFormEdit";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { AiFillFilter } from "react-icons/ai";

const Resident = () => {
  const dispatch = useDispatch();
  const {
    residents,
    residentDetail,
    page,
    size,
    totalPage,
    searchKey,
    sortBy,
    order,
    loading,
  } = useSelector((state) => state.resident);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);

  const [searchString, setSearchString] = useState(searchKey);
  const [sortByString, setSortByString] = useState(sortBy);
  const [sortByOrder, setSortByOrder] = useState(order);

  const columns = [
    {
      title: "#",
      key: "index",
      render: (value, item, index) => (page - 1) * 10 + index + 1,
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
    dispatch(
      getResident({
        page: currentPage,
        size,
        searchKey: searchString,
        sortBy: sortByString,
        order: sortByOrder,
      })
    );
  };

  useEffect(() => {
    getResidentList();
  }, [currentPage, dispatch, searchString, size, sortByOrder, sortByString]);

  const onChange = (page) => {
    setCurrentPage(page);
  }

  const onSearch = (value) => {
    setSearchString(value);
  };

  const fetchResidentById = (id) => {
    dispatch(getResidentById({ id }));
  };

  const onClickEdit = (record) => {
    fetchResidentById(record.id);
    setIsModalEditOpen(true);
  };
  const onClickDetail = (record) => {
    fetchResidentById(record.id);
    setIsModalDetailOpen(true);
  };
  const onDelete = () => {
    fetchResidentById(residentDetail.id);
    setIsModalDetailOpen(true);
  }
  return (
    <>
      <div className="resident-container">
        <div className="page-title">
          <h1>Resident</h1>
        </div>
        <div className="resident-content">
          <div className="resident-action">
            <div className="resident-action__search-group">
              <CustomSearch
                placeholder="Search resident.."
                allowClear
                onSearch={onSearch}
              />
              <CustomSelect
                suffixIcon={<AiFillFilter size={15} />}
                title="Sort by"
                onChange={(value) => setSortByString(value)}
                options={[
                  {
                    value: "fullname",
                    label: "Name",
                  },
                  {
                    value: "phone",
                    label: "Phone",
                  },
                  {
                    value: "status",
                    label: "Status",
                  },
                ]}
              />
              <CustomSelect
                title="Default"
                onChange={(value) => setSortByOrder(value)}
                options={sortOption}
              />
            </div>
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
        setIsModalAddOpen={setIsModalAddOpen}
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
        dispatch={dispatch}
        onClose={() => setIsModalDetailOpen(false)}
        open={isModalDetailOpen}
        customer={residentDetail}
        onDelete={onDelete}
      />
    </>
  );
};

export default Resident;
