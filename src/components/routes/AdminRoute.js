import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";


const AdminRoute = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth.user && auth.user.token && auth.user.role === 'admin' ? <Outlet /> : <LoadingToRedirect />;
};

export default AdminRoute;
