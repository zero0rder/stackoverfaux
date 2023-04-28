import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Comments from "../components/shared/comments";
import Answers from "../components/shared/answers";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
interface QuestionDetailProps {}

const QuestionDetail: React.FC<QuestionDetailProps> = ({}) => {
  const { pathname } = useLocation();
  const questionId = parseInt(pathname.replace("/questions/", ""));
  const currentQuestion = useSelector(
    (state: RootState) => state.questions.filter((v) => v.id == questionId)[0]
  );

  if (!currentQuestion) return <div>loading</div>;

  return (
    <Box sx={{ padding: "0 2rem" }}>
      <Grid>
        <Typography variant="h3">{currentQuestion.title}</Typography>
        <Typography
          sx={{
            "& pre": {
              backgroundColor: "linen",
              padding: "1rem",
              fontSize: "0.75rem",
            },
            "& img": {
              width: "100%",
            },
          }}
          dangerouslySetInnerHTML={{ __html: currentQuestion.body }}
        />
        <Typography sx={{ textAlign: "right", margin: "1rem 0" }}>
          user: {currentQuestion.user.name}
        </Typography>
      </Grid>
      <Comments data={currentQuestion?.comments} questionId={questionId} />
      <Typography variant="h2" sx={{ margin: "1rem 0" }}>
        {`(${currentQuestion?.answers?.length})`} Answers
      </Typography>
      <Answers data={currentQuestion?.answers} parent={questionId} />
    </Box>
  );
};

export default QuestionDetail;
