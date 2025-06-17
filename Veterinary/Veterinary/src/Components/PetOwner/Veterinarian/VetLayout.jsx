import { Outlet } from "react-router-dom";
import VetSidebar from "./VetSidebar"; // your sidebar component
import './vetTheme.css';

const VetLayout = () => {
  return (
    <div>
      <VetSidebar /> {/* Sidebar is fixed */}
      
      <div className="content p-4" style={{ marginLeft: "250px" }}>
        <Outlet /> {/* Main content appears beside the sidebar */}
      </div>
    </div>
  );
};

export default VetLayout;
