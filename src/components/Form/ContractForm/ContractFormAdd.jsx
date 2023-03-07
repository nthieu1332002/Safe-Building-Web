import { DatePicker, Form, Input, InputNumber, Modal, Radio, Select, Space } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { createResident } from "../../../store/resident/residentSlice";

const ContractFormAdd = ({
  loading,
  isModalOpen,
  handleCancel,
  setIsModalAddOpen,
  handleSubmit,
  flatType,
  customerId,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const flatTypeOptions = flatType.map((item) => {
    return { value: item.id, label: item.name };
  });
  return (
    <Modal
      title="CREATE RESIDENT ACCOUNT"
      open={isModalOpen}
      onCancel={handleCancel}
      okText="Create"
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((fieldsValue) => {
            const values = {
              ...fieldsValue,
              dateOfBirth: fieldsValue["dateOfBirth"].format("YYYY-MM-DD"),
              email: fieldsValue["email"] || "",
              citizenId: "ctid",
            };
            dispatch(createResident(values)).then((res) => {
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
        ]}
        name="create-contract-form"
        layout="vertical"
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              type: "string",
              whitespace: true,
              required: true,
              message: "Title is required.",
            },
          ]}
        >
          <Input placeholder="Title" className="custom-input" />
        </Form.Item>
        <Form.Item
          name="customer-id"
          label="customer-id"
          hidden="true"
          initialValue={customerId}
        ></Form.Item>
        <Form.Item
          name="flatTypeId"
          label="Flat type"
          rules={[
            {
              required: true,
              message: "Flat type is not valid.",
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
          name="value"
          label="Value"
          rules={[
            {
              required: true,
              type: "number",
              message: "Value is not valid.",
            },
          ]}
        >
          <InputNumber
            min={1}
            placeholder="Value"
            className="custom-input"
            addonAfter="VND"
          />
        </Form.Item>
        <Form.Item
          name="expiryDate"
          label="Expiry Date"
          rules={[
            {
              required: true,
              message: "Expiry Date is required.",
            },
          ]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContractFormAdd;
