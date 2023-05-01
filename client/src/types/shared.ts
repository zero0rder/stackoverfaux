//HTTP Request Type
export type RequestStatusType<T> = {
  data: T;
  // Multiple possible status enum values
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
};

// User Type
export type UserType = {
  id: number;
  name: string;
};

// Questions, Answers, Comment Types
export type AnswerType = {
  id: number;
  body: string;
  creation: number;
  score: number;
  user: UserType;
  accepted: boolean;
  comments?: CommentsType[];
};

export type QuestionType = {
  id: number;
  title: string;
  body: string;
  creation: number;
  score: number;
  user: UserType;
  answers?: AnswerType[];
  comments?: CommentsType[];
};

export type CommentsType = {
  id: number;
  body: string;
  user: UserType;
};
