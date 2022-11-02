import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const StudentRoute = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth.user && auth.user.token ? <Outlet /> : <LoadingToRedirect />;
};

export default StudentRoute;
