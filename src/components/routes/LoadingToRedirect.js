import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
      count === 0 && navigate("home");
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate]);

  return (
    <Box>
      <Spinner/>
      <Typography variant="h6" component="div">
        Esta ingresando a una ruta protegida, redirigiendo en {count}
      </Typography>
    </Box>
  );
};

export default LoadingToRedirect;
