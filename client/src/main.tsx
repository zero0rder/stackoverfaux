import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import App from "./App.tsx";
import QuestionDetail from "./pages/questionDetail.tsx";
import UserDetail from "./pages/userDetail.tsx";
import Users from "./pages/users.tsx";
import Dashboard from "./pages/dashboard.tsx";
import { fetchUsers } from "./reducers/users/usersSlice.ts";
import { fetchQuestions } from "./reducers/questions/questionsSlice.ts";
import "./index.css";

// Load all users and questions into the store
store.dispatch(fetchUsers());
store.dispatch(fetchQuestions());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode></React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="/questions/:id" element={<QuestionDetail />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
