import React from "react";
import { Link } from "react-router-dom";
import type { QuestionType } from "../../reducers/questions/questionsSlice";
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
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Link to={`/questions/${data.id}`}>
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
