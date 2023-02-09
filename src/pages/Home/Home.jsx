import React from "react";
import CustomChart from "../../components/Chart/CustomChart";
import CustomCard from "../../components/CustomCard/CustomCard";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
import "./style.scss";

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

  return (
    <>
      <div className="welcome">
        <h1>Hello Hieu 👋</h1>
        <p>Let's check stats today!</p>
      </div>
      <div className="statistic-wrapper">
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
      <div className="chart-wrapper">
        <CustomCard width="50%" height="300px">
          <h3 className="card-title">User Growth</h3>
          <CustomChart type="line" />
        </CustomCard>
        <CustomCard width="50%" height="300px">
          <h3 className="card-title">Revenue Growth</h3>
          <CustomChart type="pie" />
        </CustomCard>
      </div>
    </>
  );
};

export default Home;
