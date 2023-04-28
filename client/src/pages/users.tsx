import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import CardItem from "../components/shared/card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  const users = useSelector((state: RootState) => state.users);

  return (
    <Box padding={"1rem"}>
      <h3>All Users:</h3>
      <Grid container padding={"2rem"} spacing={{ xs: 2, md: 3 }}>
        {users.map((u) => (
          <CardItem key={u.id} data={u} />
        ))}
      </Grid>
    </Box>
  );
};

export default Users;
