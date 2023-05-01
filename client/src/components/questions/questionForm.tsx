import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../reducers/questions/questionsSlice";
import type { RootState } from "../../store";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
interface QuestionFormProps {}

const QuestionForm: React.FC<QuestionFormProps> = ({}) => {
  const [formTitle, setFormTitle] = useState<string>("");
  const [formBody, setFormBody] = useState<string>("");
  const userObj = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormBody(e.target.value);
  };

  const handleOnSubmit = () => {
    dispatch(addQuestion(formTitle, formBody, userObj));
    setFormTitle("");
    setFormBody("");
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"1rem"}
      rowGap={"1rem"}
    >
      <Typography fontWeight={"bold"}>Ask a question</Typography>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        rowGap={"1rem"}
      >
        <Grid item width={"100%"}>
          <TextField
            name="title"
            id="question-title"
            value={formTitle}
            onChange={handleTitleChange}
            placeholder="title..."
            fullWidth
          />
        </Grid>
        <Grid item width={"100%"}>
          <TextField
            name="body"
            id="question-body"
            value={formBody}
            onChange={handleBodyChange}
            multiline
            fullWidth
            rows={4}
            placeholder="ask here..."
            sx={{
              "& textarea": {
                height: "13rem !important",
              },
            }}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        onClick={() => handleOnSubmit()}
        sx={{ backgroundColor: "#add8e6" }}
      >
        submit
      </Button>
    </Box>
  );
};

export default QuestionForm;
