// Layout.js
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // your sidebar component
import './Theme.css';

const Layout = () => {
  return (
    <div className="d-flex">
      <div className="sidebar bg-light p-3" style={{ width: "250px" }}>
        <Sidebar />
      </div>
      <div className="content flex-grow-1 p-4">
        <Outlet /> {/* This is where the content will load */}
      </div>
    </div>
  );
};

export default Layout;
