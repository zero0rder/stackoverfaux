import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { AnswerType } from "../reducers/questions/questionsSlice";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

interface UserDetailProps {}

const UserDetail: React.FC<UserDetailProps> = ({}) => {
  const { pathname } = useLocation();
  const userId = pathname.replace("/users/", "");
  const user = useSelector(
    (state: RootState) => state.users.filter((u) => u.id == parseInt(userId))[0]
  );
  const userQuestions = useSelector((state: RootState) =>
    state.questions.filter((q) => q.user.id == parseInt(userId))
  );
  const userAnswers = useSelector((state: RootState) => {
    let answers: AnswerType[] = [];
    for (let q of state.questions) {
      if (q.answers?.length) {
        for (let query of q.answers) {
          if (query.user.id == parseInt(userId)) {
            answers.push(query);
          }
        }
      }
    }

    return answers;
  });

  return (
    <Box>
      <Typography variant="h2" textAlign={"center"} padding={"1rem 0"}>
        {user.name}
      </Typography>
      <Divider />
      <Grid container margin={"2rem 0"} display={"flex"}>
        <Grid item xs={12} sm={6} padding={"0.5rem"}>
          <Typography fontWeight={"bold"} marginBottom={"1rem"}>
            All Questions
          </Typography>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            margin={"0 1rem"}
            rowGap={"1rem"}
          >
            {userQuestions.map((q) => (
              <React.Fragment key={q.id}>
                <Paper sx={{ padding: "1rem" }}>
                  <Link to={`/questions/${q.id}`}>{q.title}</Link>
                </Paper>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} padding={"0.5rem"}>
          <Typography fontWeight={"bold"} marginBottom={"1rem"}>
            All Answers
          </Typography>
          <Grid display={"flex"} flexDirection={"column"} rowGap={"1rem"}>
            {userAnswers.map((q) => (
              <React.Fragment key={q.id}>
                <Paper sx={{ padding: "1rem" }}>
                  <Typography
                    dangerouslySetInnerHTML={{ __html: q.body }}
                    key={q.id}
                    display={"inline"}
                    fontSize={"0.85rem"}
                    sx={{
                      "& pre": {
                        backgroundColor: "linen",
                        padding: "1rem",
                        fontSize: "0.75rem",
                      },
                    }}
                  />
                </Paper>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetail;
