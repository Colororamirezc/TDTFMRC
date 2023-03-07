import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { drawerWidth, Main, DrawerHeader } from './components/navbar/styles/styles';
import StaffPresent from './screens/students/StaffPresent';
import Users from './screens/Users';
import SignIn from './screens/SignIn';
import CreateUser from './screens/admin/CreateUser';
import StudentRoute from './components/routes/StudentRoute';
import AdminRoute from './components/routes/AdminRoute';
import Home from './screens/Home';
import GeneralParts from './screens/GeneralParts';
import PartDetail from './screens/PartDetail';
import Reasons from './screens/Reasons';
import './styles.css'


import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Navbar open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
      <Main open={open}>
        <Routes>
          <Route path='login' element={<SignIn />} />
          <Route path='home' element={<Home />} />
          <Route element={<StudentRoute />}>
            <Route path='parte' element={<StaffPresent />} />
            <Route path='reasons' element={<Reasons />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path='create-user' element={<CreateUser />} />
            <Route path='admin-users' element={<Users />} />
            <Route path='general-parts' element={<GeneralParts />} />
            <Route path='detail-parts' element={<PartDetail />} />
          </Route>
        </Routes>
        <ToastContainer />
      </Main>
    </Box>
  );
};

export default App;
