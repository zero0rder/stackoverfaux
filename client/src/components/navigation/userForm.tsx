import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, deleteUser } from "../../reducers/users/userSlice";
import { addToUsers, removeFromUsers } from "../../reducers/users/usersSlice";
import {
  removeQuestions,
  removeAnswers,
} from "../../reducers/questions/questionsSlice";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/base/FormControl";
import useLocalStorage, { LocalStorageType } from "../../hooks/useLocalStorage";
import UserButton from "./userButton";
import { RootState } from "../../store";
import { generateRandomId } from "../../utils/math";
import { UserType } from "../../types/shared";

interface UserFormProps {}

const UserForm: React.FC<UserFormProps> = ({}) => {
  const [formState, setFormState] = useState("");
  const userObj = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const {
    data: localUser,
    update: setLocalUser,
    delete: removeLocalUser,
  }: LocalStorageType<UserType> = useLocalStorage<UserType>("_user");

  /**
   * Todo: consistent data
   *  If localUser is saved in LocalStorage make sure
   *  the global redux "user" state object matches value
   *  on page reload (Batch or Debounce events)
   */
  //   if (localUser !== undefined) {
  //     dispatch(createUser(localUser.id, localUser.name));
  //     dispatch(addToUsers(localUser.id, localUser.name));
  //   }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(() => e.target.value);
  };

  const handleDelete = () => {
    dispatch(removeFromUsers(userObj.id));
    dispatch(removeQuestions(userObj.id));
    dispatch(removeAnswers(userObj.id));
    dispatch(deleteUser());
    removeLocalUser("_user");
  };

  const handleSubmit = () => {
    const uuid = generateRandomId();
    dispatch(createUser(uuid, formState));
    dispatch(addToUsers(uuid, formState));
    setLocalUser({ id: uuid, name: formState });
    setFormState("");
  };

  const userExists = userObj?.id > 0;

  return (
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
        <UserButton cb={handleDelete}>Delete User</UserButton>
      ) : (
        <UserButton cb={handleSubmit}>Create User</UserButton>
      )}
    </FormControl>
  );
};

export default UserForm;
