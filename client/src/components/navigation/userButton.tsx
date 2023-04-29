import React from "react";
import Button from "@mui/material/Button";

interface UserButtonProps {
  children: string;
  cb: () => void;
}

/**
 *  Shared Button for creating/deleting a 'user' state object
 *  that takes two props: 'children' string to display inside the button
 *  and a 'callback function' to execute when a user action is taken
 */
const UserButton: React.FC<UserButtonProps> = ({ children, cb }) => (
  <Button
    onClick={() => cb()}
    sx={{ backgroundColor: "#add8e6", margin: "0.5rem 0.5rem 1rem" }}
  >
    {children}
  </Button>
);

export default UserButton;
