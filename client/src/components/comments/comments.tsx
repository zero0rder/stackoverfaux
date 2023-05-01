import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { addComment } from "../../reducers/questions/questionsSlice";
import { CommentsType } from "../../utils/types/shared";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/base/FormControl";

interface CommentsProps {
  data: CommentsType[] | undefined;
  questionId: number;
  ansId?: number;
}

/**
 *
 *  Pass down current "comments" data to display
 *  also passes a questionId if a newly created comment should belong to a question object
 *  and optionally an answerId if a newly created comment should belong to an answer object
 *
 */

const Comments: React.FC<CommentsProps> = ({ data, questionId, ansId }) => {
  const [formState, setFormState] = useState("");
  const dispatch = useDispatch();
  const userObj = useSelector((state: RootState) => state.user);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(() => e.target.value);
  };

  const handleOnSubmit = () => {
    dispatch(addComment(questionId, formState, userObj, ansId));
    setFormState("");
  };

  return (
    <Box sx={{ marginLeft: "4rem" }}>
      <Divider />
      {data?.map((c) => (
        <React.Fragment key={c.id}>
          <Box sx={{ padding: "1rem" }}>
            <Typography
              dangerouslySetInnerHTML={{ __html: c.body }}
              key={c.id}
              sx={{
                display: "inline",
                "& pre": {
                  backgroundColor: "linen",
                  padding: "1rem",
                  fontSize: "0.75rem",
                },
              }}
            />
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              {" "}
              - {c.user.name}
            </Typography>
          </Box>
          <Divider />
        </React.Fragment>
      ))}
      <FormControl>
        <Box display={"flex"}>
          <TextField
            placeholder="Add a comment..."
            autoComplete="off"
            value={formState}
            onChange={handleOnChange}
            InputProps={{
              type: "search",
            }}
            sx={{
              width: "100%",
              margin: "1rem 0",
              "& .MuiInputBase-input": {
                padding: "0.5rem",
              },
            }}
          />
          <Button
            type="submit"
            sx={{ backgroundColor: "#add8e6", margin: "1rem" }}
            onClick={() => handleOnSubmit()}
          >
            Submit
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default Comments;
