import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";

import {
  drawerWidth,
  Main,
  DrawerHeader,
} from "./components/navbar/styles/styles";
import StaffPresent from "./screens/students/StaffPresent";
import Signin from "./screens/Signin";
import CreateUser from "./screens/CreateUser";

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/parte" element={<StaffPresent />} />
        </Routes>
        <Routes>
          <Route path="/sign-in" element={<Signin />} />
        </Routes>
        <Routes>
          <Route path="/create-user" element={<CreateUser />} />
        </Routes>
      </Main>
    </Box>
  );
};

export default App;
