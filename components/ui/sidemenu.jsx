"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import ExitToApp from "@mui/icons-material/ExitToApp";
import { signOut } from "next-auth/react";

const SideMenu = ({ pathname }) => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleNavigation = (path) => {
    setLoading(true);
    router.push(path);
  };

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

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
            backgroundColor: "#0E1113",
            color: "#FFFFFF",
            borderRight: "2px solid #51626D",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.key}
              selected={pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#FD6262",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#ED6262",
                  },
                },
                "&:hover": {
                  backgroundColor: "#ED6262",
                },
                backgroundColor: pathname === item.path ? "#FD6262" : "#0E1113",
                color: pathname === item.path ? "#FFFFFF" : "#FFFFFF",
              }}
            >
              <ListItemIcon
                sx={{
                  color: pathname === item.path ? "#FFFFFF" : "#FFFFFF",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        {/* Sign Out Button */}
        <Box sx={{ padding: 2 }}>
          <Button
            startIcon={<ExitToApp />}
            variant="contained"
            fullWidth
            onClick={() => signOut()}
            sx={{
              backgroundColor: "#FD6262", // Custom background color
              color: "#FFFFFF", // Text color
              "&:hover": {
                backgroundColor: "#ED6262", // Custom hover color
              },
            }}
          >
            Sign Out
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default SideMenu;
