import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../store";
import { addAnswer } from "../../reducers/questions/questionsSlice";
import { AnswerType } from "../../types/shared";
import Comments from "../comments/comments";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/base/FormControl";
interface AnswersProps {
  data: AnswerType[] | undefined;
  parent: number;
}

/**
 *
 *  Pass down current "answer" data to display, as well a parentId (question) of answer to
 *  identify where newly created answers should be place upon submission
 *
 */

const Answers: React.FC<AnswersProps> = ({ data, parent }) => {
  const [formState, setFormState] = useState("");
  const dispatch = useDispatch();
  const userObj = useSelector((state: RootState) => state.user);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(() => e.target.value);
  };

  const handleOnSubmit = () => {
    dispatch(addAnswer(parent, formState, userObj));
    setFormState("");
  };

  return (
    <Box sx={{ padding: "1rem 0" }}>
      {data?.map((a) => (
        <React.Fragment key={a.id}>
          <Box sx={{ paddingBottom: "2rem" }}>
            <div>
              <Typography
                dangerouslySetInnerHTML={{ __html: a.body }}
                sx={{
                  "& pre": {
                    backgroundColor: "linen",
                    padding: "1rem",
                    fontSize: "0.75rem",
                  },
                }}
              />
              <Typography>score {a.score}</Typography>
              {a.accepted ? <Typography>Accepted Answer!</Typography> : null}
              <Typography sx={{ textAlign: "right", margin: "1rem 0" }}>
                <Link to={`/users/${a.user.id}`}>user: {a.user.name}</Link>
              </Typography>
            </div>
            {/* COMMENTS */}
            <Comments data={a.comments} ansId={a.id} questionId={parent} />
          </Box>
          <Divider />
        </React.Fragment>
      ))}
      <Typography
        sx={{ marginTop: "1rem", fontSize: "1.25rem", fontWeight: "bold" }}
      >
        Add an Answer
      </Typography>
      <FormControl>
        <Box textAlign={"center"}>
          <TextField
            id="outlined-multiline-static"
            value={formState}
            onChange={handleOnChange}
            multiline
            rows={4}
            placeholder="..."
            sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                margin: "2rem",
              },
              "& textarea": {
                height: "13rem !important",
              },
            }}
          />
          <Button
            type="submit"
            sx={{ backgroundColor: "#add8e6" }}
            onClick={() => handleOnSubmit()}
          >
            Submit
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default Answers;
