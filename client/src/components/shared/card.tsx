import React from "react";
import { UserType } from "../../reducers/users/userSlice";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

interface CardItemProps {
  data: UserType;
}
// Card.tsx
export const cardStyles = {
  cardWrap: {
    padding: "1.25rem",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    height: "7rem",
  },
  header: {
    height: "1rem",
    p: 0,
    "& .MuiTypography-root": {
      fontSize: "1.25rem",
      wordBreak: "break-word",
    },
  },
};
const CardItem: React.FC<CardItemProps> = ({ data }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card raised sx={cardStyles.cardWrap}>
      <Avatar
        alt=""
        src=""
        sx={{ width: 45, height: 45, marginRight: "1rem" }}
      />
      <Link key={data.id} to={`/users/${data.id}`}>
        <CardHeader sx={cardStyles.header} title={data.name} />
      </Link>
    </Card>
  </Grid>
);

export default CardItem;
