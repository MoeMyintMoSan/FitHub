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

const SideMenu = () => {
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
            selected={router.pathname === item.path} // Highlight selected item
            onClick={() => router.push(item.path)} // Navigate on click
            sx={{
              backgroundColor: router.pathname === item.path ? "#ED6262" : "#020617", //background for selected
              color: router.pathname === item.path ? "#ED6262" : "#FFFFFF", // Text color changes for selected item
              "&:hover": {
                backgroundColor: "#ED6262", // Light hover effect
              },
            }}
          >
            <ListItemIcon sx={{ color: router.pathname === item.path ? "#ED6262" : "#FFFFFF" }}>
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
