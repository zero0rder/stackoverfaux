import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import client from "../../api/client";
import { RootState } from "../../store";
import type {
  UserType,
  AnswerType,
  QuestionType,
  CommentsType,
  RequestStatusType,
} from "../../types/shared";
import { generateRandomId } from "../../utils/math";

// Fetch questions from server/Db
export const fetchQuestions = createAsyncThunk(
  "users/fetchQuestions",
  async () => {
    const res = await client.get<RequestStatusType<QuestionType[]>>(
      "http://localhost:3000/questions"
    );
    return res;
  }
);

// Post a question to server/Db
export const saveQuestion = (data: QuestionType) =>
  createAsyncThunk("users/saveQuestion", async () => {
    const res = await client.post<QuestionType>(
      "http://localhost:3000/questions/create",
      data
    );
    return res;
  });

// Initial Questions State
const initialState: RequestStatusType<QuestionType[]> = {
  data: [],
  status: "idle",
  error: undefined,
};

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: {
      reducer: (state, action: PayloadAction<QuestionType>) => {
        state.data.push(action.payload);
      },
      prepare: (title: string, body: string, user: UserType) => {
        // In a production setting a POST request would be made to
        // the backend using 'saveQuestion' thunk to save a "question"
        // record in our DB, which would generate the random ID, creation
        // date, etc. then return the response as payload below to pass
        // along to the reducer to update

        return {
          payload: {
            id: generateRandomId(),
            title: title,
            body: body,
            user: user,
            creation: Date.now(),
            score: 0,
            answers: [],
            comments: [],
          },
        };
      },
    },
    addAnswer: {
      reducer: (
        state,
        action: PayloadAction<AnswerType & { questionId: number }>
      ) => {
        const ansObj: AnswerType = {
          id: action.payload.id,
          body: action.payload.body,
          creation: action.payload.creation,
          score: action.payload.score,
          accepted: action.payload.accepted,
          user: action.payload.user,
          comments: action.payload.comments,
        };

        state.data.forEach((q: QuestionType) => {
          if (q.id == action.payload.questionId) q.answers?.push(ansObj);
        });
      },
      prepare: (questionId: number, body: string, user: UserType) => {
        return {
          payload: {
            id: generateRandomId(),
            questionId: questionId,
            body: body,
            user: user,
            creation: Date.now(),
            score: 0,
            accepted: false,
            comments: [],
          },
        };
      },
    },
    addComment: {
      reducer: (
        state,
        action: PayloadAction<
          CommentsType & { questionId: number; answerId?: number }
        >
      ) => {
        const question = state.data.filter(
          (q) => q.id == action.payload.questionId
        )[0];
        const comment: CommentsType = {
          id: action.payload.id,
          body: action.payload.body,
          user: action.payload.user,
        };

        if (action.payload?.answerId) {
          //add comment to answer
          question.answers?.forEach((a: AnswerType) => {
            if (a.id == action.payload.answerId) a.comments?.push(comment);
          });
        } else {
          //add comment to question
          question.comments?.push(comment);
        }
      },
      prepare: (
        questionId: number,
        body: string,
        user: UserType,
        answerId?: number
      ) => {
        return {
          payload: {
            id: generateRandomId(),
            questionId: questionId,
            answerId: answerId,
            body: body,
            user: user,
          },
        };
      },
    },
    removeQuestions: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((q) => q.user.id != action.payload);
      return state;
    },
    removeAnswers: (state, action: PayloadAction<number>) => {
      state.data.map((q) =>
        q.answers?.filter((a) => a.user.id != action.payload)
      );
      return state;
    },
  },
  // Handle HTTP Responses
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "success";
        // Add any fetched questions to the array
        state.data = state.data.concat(action.payload as any);
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  addQuestion,
  addAnswer,
  addComment,
  removeQuestions,
  removeAnswers,
} = questionSlice.actions;

export default questionSlice.reducer;

// reusable selector functions for our components can be created here
export const selectAllQuestions = (state: RootState) =>
  state.questions.data.slice().sort((a, b) => b.creation - a.creation);
