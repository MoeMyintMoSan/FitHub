import React from "react";
import SideMenu from "@/components/ui/sidemenu"; // Assuming SideMenu is in the correct folder
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "100%",
    maxWidth: 700,
    borderRadius: "16px", // Adjust this value for rounder corners
        "& .MuiOutlinedInput-root": {
            borderRadius: "16px", // Ensure the input field also has rounded corners
        },

}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));

const Layout = ({ children, pathname }) => {
    console.log(pathname, "pathname in layout");
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0E1113" }}
    >
      <AppBar 
          position="sticky" 
          sx={{
              backgroundColor: "#0E1113", 
              zIndex: 1201, 
              borderBottom: "2px solid #51626D",
              height: "64px"
          }}
      >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4" sx={{ color: "#ED6262" }}>
                  FitHub
              </Typography>
              
              {/* {pathname === "/search" && (
                  <Search>
                      <SearchIconWrapper>
                          <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                          placeholder="Search…"
                          inputProps={{ "aria-label": "search" }}
                      />
                  </Search>
              )} */}
              
              <Box>
                  <a href="#" className="text-white pr-10">
                      Profile
                  </a>
              </Box>
          </Toolbar>
      </AppBar>
      
      <div className="flex">
        <SideMenu pathname={pathname} />
        <div className="flex-1 container mx-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
