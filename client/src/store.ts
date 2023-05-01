import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./reducers/questions/questionsSlice";
import userReducer from "./reducers/users/userSlice";
import usersReducer from "./reducers/users/usersSlice";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    user: userReducer,
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
