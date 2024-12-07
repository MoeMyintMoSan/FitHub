"use client";
import { useState } from "react";
import { Menu } from "antd";

const SideMenu = ({ menuItems }) => {
    const [openKeys, setOpenKeys] = useState([]);

    const onOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    const generateMenuItems = (items) => {
        return Array.isArray(items)
            ? items.map((item) => {
                  if (item.subMenu) {
                      return {
                          key: item.key,
                          icon: item.icon,
                          label: item.title,
                          children: generateMenuItems(item.subMenu),
                      };
                  }
                  return {
                      key: item.key,
                      icon: item.icon,
                      label: item.title,
                  };
              })
            : [];
    };

    return (
        <div className="bg-slate-700 text-white overflow-auto h-screen w-64 "
        >
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                items={generateMenuItems(menuItems)}
            />
        </div>
    );
};

export default SideMenu;
