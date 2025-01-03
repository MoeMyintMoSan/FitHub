import React from "react";
import TopMenu from "@/components/ui/topmenu"; // Assuming TopMenu is in the correct folder
import SideMenu from "@/components/ui/sidemenu"; // Assuming SideMenu is in the correct folder

const Layout = ({ children, pathname }) => {
    console.log(pathname, "pathname in layout");
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0E1113" }} // #020617 Set the background color for the layout
    >
      <TopMenu /> {/* This will display the top menu on all pages */}
      <div className="flex">
        <SideMenu pathname={pathname} /> {/* Pass pathname dynamically */}
        <div className="flex-1 container mx-auto p-5">
          {children} {/* This will render the specific content of each page */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
