import { Outlet } from "react-router";
import Navbar from "./components/layout/navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Grid marginTop={"64px"} display={"flex"}>
        <Box width={"97%"} padding={"1rem"}>
          <Outlet />
        </Box>
      </Grid>
    </div>
  );
}

export default App;
