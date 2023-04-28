import React from "react";
import Questions from "../components/question/questions";
import QuestionForm from "../components/question/questionForm";
import Grid from "@mui/material/Grid";
interface DashboardProps {}
/**
 *
 *    Index page to show all questions and option to add questions
 *
 */
const Dashboard: React.FC<DashboardProps> = ({}) => {
  return (
    <Grid container>
      <Grid item sm={12} md={4}>
        <QuestionForm />
      </Grid>
      <Grid item sm={12} md={8}>
        <Questions />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
