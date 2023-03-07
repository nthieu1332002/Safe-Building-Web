import {
  Drawer,
  Descriptions,
  Divider,
  Tag,
  Button,
  Empty,
  List,
  Typography,
} from "antd";
import React from "react";
import { customerStatus, rentContractStatus } from "../../ultis/types";
import { FilePdfTwoTone, EditOutlined } from "@ant-design/icons";
const { Text, Link } = Typography;
const ResidentFormDetail = ({ title, onClose, open, customer }) => {
  return (
    <Drawer
      title={customer.fullname}
      closable={false}
      onClose={onClose}
      open={open}
      width="500px"
    >
      <Descriptions
        title="Personal"
        labelStyle={{ fontWeight: "bold" }}
        colon={false}
        layout="vertical"
      >
        <Descriptions.Item label="Email" span={2}>
          {customer.email}
        </Descriptions.Item>
        <Descriptions.Item label="Phone" span={2}>
          {customer.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Gender" span={1}>
          {customer.gender}
        </Descriptions.Item>
        <Descriptions.Item label="Date of birth" span={1}>
          {customer.dateOfBirth}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={1}>
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
        <Descriptions.Item label="Address" span={3}>
          {customer.address}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions
        title="Contract"
        labelStyle={{ fontWeight: "bold" }}
        colon={false}
        layout="horizontal"
        extra={<Button type="primary">Add</Button>}
      />
      {customer.contract !== "" ? (
        <List
          size="small"
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={customer.contract}
          renderItem={(contract) => (
            <List.Item
              actions={[
                <Button type="text">
                  <EditOutlined />
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <a href={contract.link}>
                    <Text ellipsis={{ tooltip: `${contract.title}` }}>
                      <FilePdfTwoTone /> {contract.title}
                    </Text>
                  </a>
                }
                description={
                  <>
                    Room {contract.roomNumber} - {contract.buildingName}
                  </>
                }
              />
              {rentContractStatus.map((item) => {
                return (
                  <>
                    {item.status === contract.status ? (
                      <Tag className="tag" color={item.color}>
                        {contract.status}
                      </Tag>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </List.Item>
          )}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Drawer>
  );
};

export default ResidentFormDetail;
