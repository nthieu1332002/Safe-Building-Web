import React, { useEffect, useState } from "react";
import { Modal, Table, Tag } from "antd";

const BillFormDetail = ({ bill, isModalOpen, handleCancel }) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    if (bill.length > 0) {
      setData(bill)
    }
  }, [bill])
  const columns = [
    {
      title: "Service",
      dataIndex: "serviceName",
      key: "serviceName",
      sorter: (a, b) => a.serviceName.localeCompare(b.serviceName),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      sorter: (a, b) => a.quantity - b.quantity,
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      sorter: (a, b) => a.price - b.price,
      render: (text) => (
        <b>{new Intl.NumberFormat("en-Us").format(text)} VND</b>
      ),
    },
  ];
  return (
    <Modal title="BILL DETAIL" open={isModalOpen} onCancel={handleCancel}>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
      />
    </Modal>
  );
};

export default BillFormDetail;
