"use client";
import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";

const SideMenu = () => {
    const menuItems = [
        { key: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
        { key: "settings", label: "Settings", icon: <SettingsIcon /> },
        { key: "profile", label: "Profile", icon: <PersonIcon /> },
        { key: "help", label: "Help & Support", icon: <HelpIcon /> },
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
                    backgroundColor: "#020617", // Dark theme
                    color: "#FFFFFF",
                    borderRight: "2px solid #51626D",
                },
            }}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.key}>
                        <ListItemIcon sx={{ color: "#FFFFFF" }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default SideMenu;
