import React from "react";
import CustomChart from "../../components/CustomChart/CustomChart";
import CustomCard from "../../components/CustomCard/CustomCard";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
import "./style.scss";
import { Space, Table, Tag } from "antd";

const Home = () => {
  const data = [
    {
      title: "Total revenue",
      amount: "$5610",
      change: {
        value: "16%",
        status: "up",
      },
    },
    {
      title: "Total resident",
      amount: "310",
      change: {
        value: "10%",
        status: "down",
      },
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const dataSource = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <div className="home-container">
      <div className="page-title">
        <h1>Hello Hieu 👋</h1>
        <p>Let's check stats today!</p>
      </div>
      <div className="statistic-wrapper">
        <div className="statistic-change-wrapper">
          {data.map((item, index) => {
            return (
              <div key={index} className="custom-card-mini">
                <h5 className="card-title">{item.title}</h5>
                <div className="card-content">
                  <div className="value">{item.amount}</div>
                  <div className="value-change">
                    {item.change?.status === "up" ? (
                      <div className="up">
                        <MdTrendingUp /> {item.change?.value}
                      </div>
                    ) : (
                      <div className="down">
                        <MdTrendingDown /> {item.change?.value}
                      </div>
                    )}
                    <span>vs last month</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="chart-revenue-element">
          <CustomCard width="100%">
            <h3 className="card-title">User</h3>
            <CustomChart type="doughnut" />
          </CustomCard>
        </div>
      </div>
      <div className="chart-wrapper">
        <CustomCard width="50%" height="300px">
          <h3 className="card-title">User</h3>

          <CustomChart type="line" />
        </CustomCard>
        <CustomCard width="50%" height="300px">
          <h3 className="card-title">Revenue</h3>

          <CustomChart type="bar" />
        </CustomCard>
      </div>
      <div className="table-wrapper">
        <CustomCard width="100%">
          <h3 className="card-title">New user</h3>
          <Table dataSource={dataSource} columns={columns} />
        </CustomCard>
      </div>
    </div>
  );
};

export default Home;
