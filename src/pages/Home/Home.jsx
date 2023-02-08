import React from "react";
import CustomChart from "../../components/Chart/CustomChart";
import CustomCard from "../../components/CustomCard/CustomCard";
import "./style.scss";

const Home = () => {
  return (
    <>
      <div className="welcome">
        <h1>Hello Hieu 👋</h1>
        <p>Let's check stats today!</p>
      </div>
      <div className="row">
        <CustomCard width="550px" height="300px">
          <h1 className="card-title">Revenue Chart</h1>
          <CustomChart type="line" />
        </CustomCard>
        <CustomCard width="550px" height="300px">
          <h1 className="card-title">User Chart</h1>
          <CustomChart type="pie"/>
        </CustomCard>
      </div>
    </>
  );
};

export default Home;
