import React from "react";
import { useLocation, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MobileMenu from "./mobileMenu";
import UserForm from "./userForm";
interface NavbarProps {}

export const headerStyles = {
  toolbar: {
    justifyContent: "space-between",
  },
  buttonGroupWeb: { display: { xs: "none", md: "flex" } },
  buttonGroupMobile: { display: { xs: "flex", md: "none" } },
  buttonHover: {
    ":hover": {
      backgroundColor: "#add8e6",
    },
  },
};

const Navbar: React.FC<NavbarProps> = ({}) => (
  <AppBar sx={{ backgroundColor: "#fff", color: "#1976d2" }}>
    <Toolbar sx={headerStyles.toolbar}>
      <ButtonGroup variant="text" sx={headerStyles.buttonGroupWeb}>
        {getNavItems()}
      </ButtonGroup>
      <ButtonGroup sx={headerStyles.buttonGroupMobile}>
        <MobileMenu />
      </ButtonGroup>
      <UserForm />
    </Toolbar>
  </AppBar>
);

export default Navbar;

export const headerTabs = [
  { label: "Questions", href: "/" },
  { label: "Users", href: "/users" },
];

const getNavItems = () => {
  const { pathname } = useLocation();
  return headerTabs.map(({ label, href }) => (
    <Button
      {...{
        key: label,
        color: "inherit",
        to: href,
        component: Link,
      }}
      sx={{
        backgroundColor: pathname == href ? "#add8e6" : "",
        ...headerStyles.buttonHover,
      }}
    >
      {label}
    </Button>
  ));
};
