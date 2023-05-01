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

/**
 *
 *  Gather & Filter all Users Data from SeedQuestions
 *
 */
export function formatUsers(A: QuestionType[]) {
  const users: UserType[] = [];

  for (let q of A) {
    users.push(q.user);

    if (q.comments?.length) {
      for (let c of q.comments) {
        users.push(c.user);
      }
    }

    if (q.answers?.length) {
      for (let a of q.answers) {
        users.push(a.user);

        if (a.comments?.length) {
          for (let com of a.comments) {
            users.push(com.user);
          }
        }
      }
    }
  }

  return filterUsers(users);
}

function filterUsers(A: UserType[]) {
  return A.filter((obj, i) => A.findIndex((j) => j.id === obj.id) === i);
}
