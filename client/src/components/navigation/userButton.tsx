import React from "react";
import Button from "@mui/material/Button";

interface UserButtonProps {
  children: React.ReactNode | string;
  cb: () => void;
}

const UserButton: React.FC<UserButtonProps> = ({ children, cb }) => {
  return (
    <Button
      onClick={() => cb()}
      sx={{ backgroundColor: "#add8e6", margin: "0.5rem 0.5rem 1rem" }}
    >
      {children}
    </Button>
  );
};

export default UserButton;
