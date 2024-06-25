import React from "react";
import NavBottom from "../components/NavBottom";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div>
Movie Mania
      <Outlet />
      <NavBottom />
    </div>
  );
};

export default Home;
