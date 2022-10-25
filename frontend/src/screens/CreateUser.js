import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const initialRegister = {
  name: "",
  lastName: "",
  rut: "",
  grade: "",
  specialty: "",
  administrativePermission: 0,
  FLA: 0,
  password: "",
};

const CreateUser = () => {
  const [values, setValues] = useState(initialRegister);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Regístrate Aquí
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name={initialRegister.name}
                  required
                  fullWidth
                  label="Nombre"
                  autoFocus
                  id={initialRegister.name}
                  value={initialRegister.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id={initialRegister.lastName}
                  label="Apellidos"
                  name={initialRegister.lastName}
                  autoComplete="family-name"
                  value={initialRegister.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id={initialRegister.rut}
                  label="RUT"
                  name={initialRegister.rut}
                  autoComplete={initialRegister.rut}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={initialRegister.grade}
                  label="Grado"
                  type={initialRegister.grade}
                  id={initialRegister.grade}
                  autoComplete={initialRegister.grade}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={initialRegister.specialty}
                  label="Especialidad"
                  type={initialRegister.specialty}
                  id={initialRegister.specialty}
                  autoComplete={initialRegister.specialty}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <InputLabel id="228">Días de 228</InputLabel>
                <Select
                  id={initialRegister.administrativePermission}
                  labelId="Días de 228"
                  fullWidth
                  name={initialRegister.administrativePermission}
                  required
                  value={initialRegister.administrativePermission}
                  onChange={handleChange}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>0,5</MenuItem>
                  <MenuItem value={2}>1</MenuItem>
                  <MenuItem value={3}>1,5</MenuItem>
                  <MenuItem value={4}>2</MenuItem>
                  <MenuItem value={5}>2,5</MenuItem>
                  <MenuItem value={6}>3</MenuItem>
                  <MenuItem value={7}>3,5</MenuItem>
                  <MenuItem value={8}>4</MenuItem>
                  <MenuItem value={9}>4,5</MenuItem>
                  <MenuItem value={10}>5</MenuItem>
                  <MenuItem value={11}>5,5</MenuItem>
                  <MenuItem value={12}>6</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <TextField
                  required
                  fullWidth
                  id={initialRegister.FLA}
                  label="FLA Disponibles"
                  name={initialRegister.FLA}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={initialRegister.password}
                  label="Contraseña"
                  type={initialRegister.password}
                  id={initialRegister.password}
                  autoComplete={initialRegister.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={initialRegister.password}
                  label="Repita la contraseña"
                  type={initialRegister.password}
                  id={initialRegister.password}
                  autoComplete={initialRegister.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Regístrate
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Ya tienes una cuenta? Ingresa Aquí
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateUser;
