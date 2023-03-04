import { Drawer, Descriptions, Divider } from "antd";
import React from "react";

const ResidentFormDetail = ({ title, onClose, open, item }) => {
  console.log("item", item);
  return (
    <Drawer
      title={item.fullname}
      closable={false}
      onClose={onClose}
      open={open}
    >
      <Descriptions
        title="Personal"
        labelStyle={{ fontWeight: "bold" }}
        colon={false}
        layout="vertical"
      >
        <Descriptions.Item label="Phone" span={2}>
          {item.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          {item.status}
        </Descriptions.Item>
        <Descriptions.Item label="Gender" span={2}>
          {item.gender}
        </Descriptions.Item>
        <Descriptions.Item label="Date of birth" span={2}>
          {item.dateOfBirth}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
          {item.address}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions
        title="Contract"
        labelStyle={{ fontWeight: "bold" }}
        colon={false}
        layout="vertical"
      >
      </Descriptions>
    </Drawer>
  );
};

export default ResidentFormDetail;
