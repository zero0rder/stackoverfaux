import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import CardItem from "../components/shared/cardItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { /*fetchUsers,*/ selectAllUsers } from "../reducers/users/usersSlice";
interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  const status = useSelector((state: RootState) => state.users.status);
  const users = useSelector(selectAllUsers);

  // NOTE: Could also run the commented out code below if you needed to
  // fetch all users when this component is rendered.

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (status === "idle") dispatch(fetchUsers() as any);
  // }, [status, dispatch]);

  return (
    <Box padding={"1rem"}>
      <h3>All Users:</h3>
      <Grid container padding={"2rem"} spacing={{ xs: 2, md: 3 }}>
        {status === "loading"
          ? // Skeleton for fetching users when rendering..
            Array.from(new Array(7)).map((_, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" height={210} />
              </Grid>
            ))
          : users.map((u) => <CardItem key={u.id} data={u} />)}
      </Grid>
    </Box>
  );
};

export default Users;
