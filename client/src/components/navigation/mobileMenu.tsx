import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

interface MobileMenuProps {}
export const headerTabs = [
  { label: "Questions", href: "/" },
  { label: "Users", href: "/users" },
];

// MobileMenu.tsx
export const mobileMenuStyles = {
  menuButton: {
    minWidth: "2.75rem",
  },
  menuIcon: { fontSize: "1.75rem" },
};

const MobileMenu: React.FC<MobileMenuProps> = ({}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let isOpen = anchorEl !== null;

  return (
    <>
      <Button
        sx={mobileMenuStyles.menuButton}
        id="mobile-button"
        aria-controls={isOpen ? "mobile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={handleOpen}
      >
        <MenuIcon sx={mobileMenuStyles.menuIcon} />
      </Button>
      <Menu
        id="mobile-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "mobile-button",
        }}
      >
        {headerTabs.map((t) => (
          <MenuItem
            {...{
              key: t.label,
              color: "inherit",
              to: t.href,
              component: Link,
            }}
            onClick={handleClose}
          >
            {t.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MobileMenu;
