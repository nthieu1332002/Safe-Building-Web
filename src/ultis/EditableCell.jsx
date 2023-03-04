import { Form, Input } from "antd";
import { useEffect } from "react";
import CustomSelect from "../components/CustomSelect/CustomSelect";
import { adminStatus, customerStatus, flatStatus } from "./types";

export const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  tableName,
  record,
  index,
  children,
  ...restProps
}) => {
  let statusType;
  switch (tableName) {
    case "admin":
      statusType = adminStatus;
      break;
    case "customer":
      statusType = customerStatus;
      break;
    case "flat":
      statusType = flatStatus;
      break;
    default:
      statusType = adminStatus;
  }
  const options = statusType.map((item) => {
    return { value: item.status, label: item.status };
  });
  const inputNode =
    inputType === "status" ? (
      <CustomSelect title={record.status} options={options} onChange />
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
