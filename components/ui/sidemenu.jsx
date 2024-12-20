"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";

const SideMenu = ({ pathname }) => { // Correctly destructuring `pathname` from props
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  const menuItems = [
    { key: "search", label: "Search", icon: <SearchIcon />, path: "/search" },
    { key: "home", label: "Home", icon: <HomeIcon />, path: "/home" },
    { key: "privatefeed", label: "Private Feed", icon: <ChatIcon />, path: "/private_feed" },
    { key: "profile", label: "Profile", icon: <PersonIcon />, path: "/profile" },
  ];
  console.log(pathname, "pathname in side");
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        height: "100vh",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          paddingTop: "74px",
          width: 240,
          height: "100vh",
          boxSizing: "border-box",
          backgroundColor: "#020617", 
          color: "#FFFFFF",
          borderRight: "2px solid #51626D",
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton
          key={item.key}
          selected={pathname === item.path}
          onClick={() => router.push(item.path)}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#FD6262", // Custom background for selected
              color: "#FFFFFF", // Custom text color for selected
              "&:hover": {
                backgroundColor: "#ED6262", // Custom hover effect for selected
              },
            },
            "&:hover": {
              backgroundColor: "#ED6262", // Custom hover effect for non-selected
            },
            backgroundColor: pathname === item.path ? "#FD6262" : "#020617", // Default background
            color: pathname === item.path ? "#FFFFFF" : "#FFFFFF", // Default text color
          }}
        >
          <ListItemIcon
            sx={{
              color: pathname === item.path ? "#FFFFFF" : "#FFFFFF", // Icon color
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
        
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
