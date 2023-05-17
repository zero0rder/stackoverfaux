import express from "express";
import cors from "cors";
import UserRouter from "./routes/users";
import QueryRoutes from "./routes/questions";

const app = express();
app.use(express.json());
app.use(cors());
/** USERS ROUTES */
app.use("/users", UserRouter);
app.use("/questions", QueryRoutes);

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
