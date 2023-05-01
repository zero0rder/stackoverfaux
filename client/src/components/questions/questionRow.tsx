import React from "react";
import { Link } from "react-router-dom";
import type { QuestionType } from "../../utils/types/shared";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface QuestionRowProps {
  data: QuestionType;
}

const QuestionRow: React.FC<QuestionRowProps> = ({ data }) => (
  <>
    <ListItem alignItems="flex-start">
      <ListItemAvatar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "15%",
        }}
      >
        <Avatar alt="Remy Sharp" />
        <Link to={`/users/${data.user.id}`} style={{ color: "#1976d2" }}>
          <Typography
            fontSize={"0.85rem"}
            padding={"0.25rem"}
            fontWeight={"bold"}
            textAlign={"center"}
            sx={{ wordBreak: "break-word" }}
          >
            {data.user.name}
          </Typography>
        </Link>
        <Typography fontSize={"0.75rem"} padding={"0.25rem"} fontWeight={"500"}>
          {new Date(data.creation).toLocaleDateString()}
        </Typography>
      </ListItemAvatar>
      <ListItemText
        sx={{ padding: "0 1rem" }}
        primary={
          <Link to={`/questions/${data.id}`} style={{ color: "#1976d2" }}>
            <Typography
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "1rem",
                  fontWeight: "bold",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                },
              }}
            >
              {data.title}
            </Typography>
          </Link>
        }
        secondary={
          <Typography
            sx={{
              display: "inline",
              "&.MuiTypography-root": {
                height: "81px",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "4",
                WebkitBoxOrient: "vertical",
              },
            }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {data.body}
          </Typography>
        }
      />
    </ListItem>
    <Divider />
  </>
);

export default QuestionRow;
