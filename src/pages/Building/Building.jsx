import React, { useEffect, useState } from "react";
import { FaBuilding } from "react-icons/fa";
import buildingAPI from "../../config/api/building/buildingAPI";
import "./style.scss";
const { getBuildingAPI } = buildingAPI;

const Building = () => {
  const [building, setBuilding] = useState([]);
  console.log("building", building);

  useEffect(() => {
    getBuildingAPI().then((res) => {
      setBuilding(res);
    });
  }, []);

  return (
    <div className="building-container">
      <div className="page-title">
        <h1>Building</h1>
      </div>
      <div className="building">
        {building.data?.map((item, index) => {
          return (
            <div className={`building-item  ${item.status === "AVAILABLE" ? "available" : ""}`} key={index}>
              <div className="building-item__icon">
                <FaBuilding size={30}/>
              </div>
              <h5 className="building-item__name">{item.name}</h5>
              <p className="building-item__status">{item.status}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Building;
