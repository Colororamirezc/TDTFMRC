import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import authService from '../../features/auth/authService';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import Spinner from '../../components/spinner/Spinner';

//TODO: Create validation for RUT, and get selects from DATABASE

const theme = createTheme();

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    rut: '',
    grade: '',
    specialty: '',
    administrativePermission: 0,
    FLA: 0,
    role: '',
    area: '',
    password: '',
    password2: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      return toast.error('Las contraseñas no coinciden');
    } else if (formData.password.length < 6) {
      toast.error('Contraseña muy corta');
    } else {
      setIsLoading(true);
      saveUser({
        name: formData.name,
        lastName: formData.lastName,
        rut: formData.rut,
        grade: formData.grade,
        specialty: formData.specialty,
        administrativePermission: formData.administrativePermission,
        FLA: formData.FLA,
        role: formData.role,
        area: formData.area,
        password: formData.password,
      });
      toast.success('Usuario creado con éxito');
      setFormData({
        name: '',
        lastName: '',
        rut: '',
        grade: '',
        specialty: '',
        administrativePermission: 0,
        FLA: 0,
        role: '',
        area: '',
        password: '',
        password2: '',
      });
      setIsLoading(false);
    }
  };

  const saveUser = async (us) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/create-user`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(us)
    });
    const content = await res.json();
    return toast.done('Usuario creado exitosamente');
  }

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <Box
          style={{
            backgroundColor:'white',
            padding: 10,
            margin: 2,
            borderRadius: 10
          }}
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
            <Grid container spacing={2} columns={20}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name='name'
                  required
                  fullWidth
                  label='Nombre'
                  id='name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Apellidos'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField required fullWidth id='rut' label='RUT' name='rut' onChange={handleChange} value={formData.rut} />
              </Grid>
              <Grid item xs={5}>
                <InputLabel id='area'>Departamento o curso</InputLabel>
                <Select
                  required
                  fullWidth
                  name='area'
                  label='Departamento o curso'
                  id='area'
                  value={formData.area}
                  onChange={handleChange}
                >
                  <MenuItem value={'TI01'}>Primero TI</MenuItem>
                  <MenuItem value={'I01'}>Primero I</MenuItem>
                  <MenuItem value={'AD01'}>Primero AD</MenuItem>
                  <MenuItem value={'TI02'}>Segundo TI</MenuItem>
                  <MenuItem value={'I02'}>Segundo I</MenuItem>
                  <MenuItem value={'AD02'}>Segundo AD</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={5}>
                <InputLabel id='grade'>Grado</InputLabel>
                <Select required fullWidth name='grade' label='Grado' id='grade' value={formData.grade} onChange={handleChange}>
                  <MenuItem value={'ALF'}>ALF</MenuItem>
                  <MenuItem value={'STE'}>STE</MenuItem>
                  <MenuItem value={'TTE'}>TTE</MenuItem>
                  <MenuItem value={'CDB'}>CDB</MenuItem>
                  <MenuItem value={'CDE'}>CDE</MenuItem>
                  <MenuItem value={'CDG'}>CDG</MenuItem>
                  <MenuItem value={'CDA'}>CDA</MenuItem>
                  <MenuItem value={'SG'}>SG</MenuItem>
                  <MenuItem value={'SG1'}>SG1</MenuItem>
                  <MenuItem value={'PCP'}>PCP</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={5}>
                <InputLabel id='specialty'>Especialidad</InputLabel>
                <Select
                  required
                  fullWidth
                  name='specialty'
                  label='Especialidad'
                  id='specialty'
                  value={formData.specialty}
                  onChange={handleChange}
                >
                  <MenuItem value={'TI'}>TI</MenuItem>
                  <MenuItem value={'AD'}>AD</MenuItem>
                  <MenuItem value={'I'}>I</MenuItem>
                  <MenuItem value={'A'}>A</MenuItem>
                  <MenuItem value={'DA'}>DA</MenuItem>
                  <MenuItem value={'NO_SPECIALTY'}>Sin especialidad</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={5}>
                <InputLabel id='administrativePermission'>Días de 228</InputLabel>
                <Select
                  labelId='Días de 228'
                  fullWidth
                  name='administrativePermission'
                  required
                  id='administrativePermission'
                  type='number'
                  value={formData.administrativePermission}
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
              <Grid item xs={10}>
                <InputLabel id='role'>Tipo de usuario</InputLabel>
                <Select
                  labelId='Tipo de usuario'
                  fullWidth
                  name='role'
                  required
                  id='role'
                  value={formData.role}
                  onChange={handleChange}
                >
                  <MenuItem value={'student'}>Estudiante</MenuItem>
                  <MenuItem value={'admin'}>Administrador</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  style={{marginTop:22}}
                  required
                  fullWidth
                  id='FLA'
                  label='FLA Disponibles'
                  type='number'
                  value={formData.FLA}
                  name='FLA'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Contraseña'
                  type='password'
                  id='password'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  required
                  fullWidth
                  name='password2'
                  label='Repita la contraseña'
                  type='password'
                  id='password2'
                  onChange={handleChange}
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
