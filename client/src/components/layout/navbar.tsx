import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createUser,
  deleteUser,
  UserType,
} from "../../reducers/users/userSlice";
import { addToUsers, removeFromUsers } from "../../reducers/users/usersSlice";
import {
  removeQuestions,
  removeAnswers,
} from "../../reducers/questions/questionsSlice";
import { useLocation, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MobileMenu from "../shared/mobileMenu";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/base/FormControl";
import useLocalStorage from "../../hooks/useLocalStorage";
// import { v4 as uuidv4 } from "uuid";

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

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [formState, setFormState] = useState("");
  const dispatch = useDispatch();
  const {
    data: localUser,
    update: setLocalUser,
    delete: removeLocalUser,
  }: {
    data: UserType;
    update: (value: UserType) => void;
    delete: (str: string) => void;
  } = useLocalStorage("_userX");

  /**
   * Todo: consistent data
   *  If localUser is saved in LocalStorage make sure
   *  the global redux "user" state object matches value
   */
  // if (localUser !== undefined) {
  //   dispatch(createUser(localUser));
  // }

  //=> Form Methods:
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(() => e.target.value);
  };

  const handleDelete = () => {
    dispatch(removeFromUsers(localUser.id));
    dispatch(deleteUser());
    dispatch(removeQuestions(localUser.id));
    dispatch(removeAnswers(localUser.id));
    removeLocalUser("_userX");
  };

  const handleSubmit = () => {
    // let shortenedId = uuidv4().slice(0, 13);
    const user = { id: 7654, name: formState };
    dispatch(createUser(user));
    dispatch(addToUsers(user));
    setLocalUser(user);
    setFormState("");
  };

  const userExists = localUser && localUser?.id > 0;

  return (
    <AppBar sx={{ backgroundColor: "#fff", color: "#000" }}>
      <Toolbar sx={headerStyles.toolbar}>
        <ButtonGroup variant="text" sx={headerStyles.buttonGroupWeb}>
          {getNavItems()}
        </ButtonGroup>
        <FormControl>
          {userExists ? null : (
            <TextField
              placeholder="username..."
              value={formState}
              onChange={handleOnChange}
              autoComplete="off"
              InputProps={{
                type: "search",
              }}
              sx={{
                margin: "0.5rem 0 1rem",
                "& .MuiInputBase-input": {
                  padding: "0.5rem",
                },
              }}
            />
          )}
          {userExists ? (
            <Button
              onClick={() => handleDelete()}
              sx={{ backgroundColor: "#add8e6", margin: "0.5rem 0.5rem 1rem" }}
            >
              Delete User
            </Button>
          ) : (
            <Button
              onClick={() => handleSubmit()}
              sx={{ backgroundColor: "#add8e6", margin: "0.5rem 0.5rem 1rem" }}
            >
              Create User
            </Button>
          )}
        </FormControl>
        <ButtonGroup sx={headerStyles.buttonGroupMobile}>
          <MobileMenu />
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

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
