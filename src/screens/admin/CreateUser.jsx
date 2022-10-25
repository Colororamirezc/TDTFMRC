import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { LinearProgress } from '@mui/material';

const theme = createTheme();

const CreateUser = () => {
  const [values, setValues] = useState({
    name: '',
    lastName: '',
    rut: '',
    grade: '',
    specialty: '',
    administrativePermission: 0,
    FLA: 0,
    admin:'',
    password: '',
    password2: '',
  });

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/home');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    if (values.password !== values.password2) {
      return toast.error('Las contraseñas no coinciden');
    } else if (values.password.length < 6) {
      toast.error('Contraseña muy corta');
    } else {
      dispatch(register(values));
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Regístrate Aquí
          </Typography>
          <Box component='form' noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name={values.name}
                  required
                  fullWidth
                  label='Nombre'
                  autoFocus
                  id={values.name}
                  value={values.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id={values.lastName}
                  label='Apellidos'
                  name={values.lastName}
                  autoComplete='family-name'
                  value={values.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id={values.rut} label='RUT' name={values.rut} autoComplete={values.rut} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={values.grade}
                  label='Grado'
                  type={values.grade}
                  id={values.grade}
                  autoComplete={values.grade}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={values.specialty}
                  label='Especialidad'
                  type={values.specialty}
                  id={values.specialty}
                  autoComplete={values.specialty}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <InputLabel id='228'>Días de 228</InputLabel>
                <Select
                  id={values.administrativePermission}
                  labelId='Días de 228'
                  fullWidth
                  name={values.administrativePermission}
                  required
                  value={values.administrativePermission}
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
                <TextField required fullWidth id={values.FLA} label='FLA Disponibles' name={values.FLA} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={values.password}
                  label='Contraseña'
                  type={values.password}
                  id={values.password}
                  autoComplete={values.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={values.password}
                  label='Repita la contraseña'
                  type={values.password}
                  id={values.password}
                  autoComplete={values.password}
                />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Regístrate
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateUser;
