import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { drawerWidth, Main, DrawerHeader } from './components/navbar/styles/styles';
import StaffPresent from './screens/students/StaffPresent';
import SignIn from './screens/SignIn';
import CreateUser from './screens/admin/CreateUser';

import 'react-toastify/dist/ReactToastify.css';
import StudentRoute from './components/routes/StudentRoute';
import AdminRoute from './components/routes/AdminRoute';
import Home from './screens/Home';

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route path='login' element={<SignIn />} />
            <Route path='home' element={<Home />} />
            <Route element={<StudentRoute />}>
              <Route path='parte' element={<StaffPresent />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path='create-user' element={<CreateUser />} />
            </Route>
          </Routes>
          <ToastContainer />
        </Main>
      </Box>
    </>
  );
};

export default App;
