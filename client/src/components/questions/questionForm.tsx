import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../reducers/questions/questionsSlice";
import type { RootState } from "../../store";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
interface QuestionFormProps {}
type FormProps = {
  title: string;
  body: string;
};

const QuestionForm: React.FC<QuestionFormProps> = ({}) => {
  const [formState, setFormState] = useState<FormProps>({
    title: "",
    body: "",
  });

  const userObj = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = () => {
    dispatch(addQuestion(formState.title, formState.body, userObj));
    setFormState({ title: "", body: "" });
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
            value={formState.title}
            onChange={handleOnChange}
            placeholder="title..."
            fullWidth
          />
        </Grid>
        <Grid item width={"100%"}>
          <TextField
            name="body"
            id="question-body"
            value={formState.body}
            onChange={handleOnChange}
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
