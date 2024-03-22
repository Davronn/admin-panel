import React, { useEffect, useState } from "react";
import "../sass/dashboard.scss";
import logo from "../assets/Logo.svg";
import setting from "../assets/settings.svg";
import shop from "../assets/addSavat.svg";
import { Link, useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState("");

  useEffect(() => {
    const pathName = location.pathname;
    const activeIcon = determineActiveIcon(pathName);
    setActiveIcon(activeIcon);
  }, [location.pathname]);

  const determineActiveIcon = (pathName) => {
    if (pathName === "/") {
      return "settings";
    } else if (pathName === "/addproduct") {
      return "shop";
    }
    return "";
  };

  return (
    <div className="dashboard">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="dashboard-icons">
        <Link to="/">
          <div
            className={`dashboard-icon setting ${
              activeIcon === "settings" ? "active" : ""
            }`}
          >
            <img src={setting} alt="" />
          </div>
        </Link>
        <Link to="/addproduct">
          <div
            className={`dashboard-icon shop ${
              activeIcon === "shop" ? "active" : ""
            }`}
          >
            <img src={shop} alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
