import { Form, Input, InputNumber, Modal, Radio, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useDispatch } from "react-redux";
import { createFlat } from "../../store/flat/flatSlice";
import { flatStatus } from "../../ultis/types";

const FlatFormAdd = ({
  loading,
  isModalOpen,
  handleCancel,
  setIsModalAddOpen,
  handleSubmit,
  flatType,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const options = flatStatus.map((item) => {
    return { value: item.status, label: item.status };
  });
  const flatTypeOptions = flatType.map((item) => {
    return { value: item.id, label: item.name };
  });
  return (
    <Modal
      title="CREATE A NEW FLAT"
      open={isModalOpen}
      onCancel={handleCancel}
      okText="Create"
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            const data = {
              ...values,
              buildingId: "177db79d-d423-4c65-83fd-37b15e18c96c",
            };
            dispatch(createFlat(data)).then((res) => {
              if (res.payload.status === 201) {
                form.resetFields();
                setIsModalAddOpen(false);
                handleSubmit();
              }
            });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        fields={[
          {
            name: ["flatTypeId"],
            value: flatTypeOptions[0]?.value,
          },
          {
            name: ["status"],
            value: options[0]?.value,
          },
        ]}
        name="create-flat-form"
        layout="vertical"
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Space size="large">
          <Form.Item
            name="roomNumber"
            label="Room number"
            rules={[
              {
                type: "number",
                required: true,
                message: "Room number is required.",
              },
            ]}
          >
            <InputNumber
              min={101}
              placeholder="Room number"
              className="custom-input"
            />
          </Form.Item>
          <Form.Item
            name="buildingId"
            label="In building"
            rules={[
              {
                required: true,
                message: "Building is not valid.",
              },
            ]}
          >
            <Select
              options={options}
              style={{
                width: 120,
              }}
            />
          </Form.Item>
        </Space>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              type: "number",
              message: "Price is not valid.",
            },
          ]}
        >
          <InputNumber
            min={1}
            placeholder="Price"
            className="custom-input"
            addonAfter="VND"
          />
        </Form.Item>

        <Space size="large">
          <Form.Item
            name="flatTypeId"
            label="Room type"
            rules={[
              {
                required: true,
                message: "Room type is not valid.",
              },
            ]}
          >
            <Select
              options={flatTypeOptions}
              style={{
                width: 180,
              }}
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Status is not valid.",
              },
            ]}
          >
            <Select
              options={options}
              style={{
                width: 120,
              }}
            />
          </Form.Item>
        </Space>

        <Form.Item
          name="detail"
          label="Detail"
          rules={[
            {
              type: "string",
              whitespace: true,
              required: true,
              message: "Detail is required.",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Detail" maxLength={6} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FlatFormAdd;
