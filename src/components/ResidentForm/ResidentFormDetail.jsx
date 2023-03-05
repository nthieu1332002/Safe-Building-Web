import { Drawer, Descriptions, Divider, Tag, Button } from "antd";
import React from "react";
import { customerStatus } from "../../ultis/types";

const ResidentFormDetail = ({ title, onClose, open, customer }) => {

  return (
    <Drawer
      title={customer.fullname}
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
          {customer.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
        {customerStatus.map((item) => {
            return (
              <>
                {item.status === customer.status ? (
                  <Tag className="tag" color={item.color}>
                    {customer.status}
                  </Tag>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </Descriptions.Item>
        <Descriptions.Item label="Gender" span={2}>
          {customer.gender}
        </Descriptions.Item>
        <Descriptions.Item label="Date of birth" span={2}>
          {customer.dateOfBirth}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
          {customer.address}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions
        title="Contract"
        labelStyle={{ fontWeight: "bold" }}
        colon={false}
        layout="vertical"
        extra={<Button type="primary">Edit</Button>}
      >
      </Descriptions>
    </Drawer>
  );
};

export default ResidentFormDetail;
