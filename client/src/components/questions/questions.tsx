import React from "react";
import { useSelector } from "react-redux";
import QuestionRow from "./questionRow";
import type { QuestionType } from "../../utils/types/shared";
import { selectAllQuestions } from "../../reducers/questions/questionsSlice";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";

interface QuestionsProps {}

const Questions: React.FC<QuestionsProps> = ({}) => {
  /**
   *  Would fetch questions data on-demand instead of
   *  on startup depending on application requirements
   */
  const questionData = useSelector(selectAllQuestions);
  return (
    <Grid sx={{ maxWidth: "850px", margin: "0 auto" }}>
      <List style={{ display: "flex", flexDirection: "column" }}>
        {questionData.map((query: QuestionType) => (
          <QuestionRow key={query.id} data={query} />
        ))}
      </List>
    </Grid>
  );
};

export default Questions;
