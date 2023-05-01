import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Comments from "../components/comments/comments";
import Answers from "../components/answers/answers";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
interface QuestionDetailProps {}

const QuestionDetail: React.FC<QuestionDetailProps> = ({}) => {
  const { pathname } = useLocation();
  const questionId = parseInt(pathname.replace("/questions/", ""));
  /**
   *  Would fetch question data on-demand instead of
   *  on app startup depending on application requirements
   */
  const currentQuestion = useSelector(
    (state: RootState) =>
      state.questions.data.filter((v) => v.id == questionId)[0]
  );

  // MUI Skeleton should be here!
  if (!currentQuestion) return <div>loading</div>;

  return (
    <Box sx={{ padding: "0 2rem" }}>
      <Grid>
        <Typography variant="h3">{currentQuestion.title}</Typography>
        <Typography
          padding={"0.5rem 0"}
          fontSize={"0.85rem"}
          color={"#1976d2"}
          fontWeight={"bold"}
        >
          Asked on {new Date(currentQuestion.creation).toLocaleDateString()}
        </Typography>
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
          <Link to={`/users/${currentQuestion.user.id}`}>
            user: {currentQuestion.user.name}
          </Link>
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
