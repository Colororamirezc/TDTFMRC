import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import useFetch from "../hooks/useFetch";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const { data: users } = useFetch(`${process.env.REACT_APP_BACKEND}/users`);
  const [tmpData, setTmpData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialog1, setOpenDialog1] = React.useState(false);
  const [openDialog2, setOpenDialog2] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    lastName: '',
    rut: '',
    grade: '',
    specialty: '',
    administrativePermission: 0,
    FLA: 0,
    role: '',
    area: ''
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    saveUser({
      id: tmpData.id,
      name: formData.name,
      lastName: formData.lastName,
      rut: formData.rut,
      grade: formData.grade,
      specialty: formData.specialty,
      administrativePermission: formData.administrativePermission,
      FLA: formData.FLA,
      role: formData.role,
      area: formData.area,
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
    });
    setIsLoading(false);
  };
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleClickOpen1 = () => {
    setOpenDialog1(true);
  };
  const handleClose1 = () => {
    setOpenDialog1(false);
  };
  const handleClickOpen2 = () => {
    setOpenDialog2(true);
  };
  const handleClose2 = () => {
    setOpenDialog2(false);
  };
  const deleteUser = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/delete-user`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });
    const content = await res.json();
    window.location.reload(true);
    return toast.done('Usuario eliminado exitosamente');
  }
  const saveUser = async (us) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/update-user`, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(us)
    });
    const content = await res.json();
    window.location.reload(true);
    return toast.done('Usuario creado exitosamente');
  }
  return (
    <Container>
      <Button onClick={() => { navigate('/create-user') }} style={{ width: '30vh', alignSelf: 'center', margin: 5 }} variant="contained" sx={{ mt: 1, mb: 0 }}>
        Crear Usuario
      </Button>
      <TableContainer component={Paper}>
        <Table
          sx={{
            marginTop: 8,
            flexDirection: "column",
            justifyContent: "center",
            margin: "auto",
            alignItems: "center",
            minWidth: 800,
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre </StyledTableCell>
              <StyledTableCell align="center">Apellido</StyledTableCell>
              <StyledTableCell align="left">Rut</StyledTableCell>
              <StyledTableCell align="left">Grado</StyledTableCell>
              <StyledTableCell align="left">Especialidad</StyledTableCell>
              <StyledTableCell align="center">228</StyledTableCell>
              <StyledTableCell align="center">FLA</StyledTableCell>
              <StyledTableCell align="center">Area</StyledTableCell>
              <StyledTableCell align="center">Rol</StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell component="th" scope="row">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">{item.lastName}</StyledTableCell>
                  <StyledTableCell align="left">{item.rut}</StyledTableCell>
                  <StyledTableCell align="left">{item.grade}</StyledTableCell>
                  <StyledTableCell align="left">{item.specialty}</StyledTableCell>
                  <StyledTableCell align="center">{item.administrativePermission}</StyledTableCell>
                  <StyledTableCell align="center">{item.FLA}</StyledTableCell>
                  <StyledTableCell align="center">{item.area}</StyledTableCell>
                  <StyledTableCell align="center">{item.role}</StyledTableCell>
                  <StyledTableCell align="center">
                    {/* <IconButton color='inherit' edge='end' onClick={() => { handleClickOpen2(!openDialog2) }}>
                      <BlockIcon color='warning' />
                    </IconButton> */}
                    <IconButton color='inherit' edge='end' onClick={() => {
                      handleClickOpen1(!openDialog1);
                      setTmpData({
                        id: item._id,
                        rut: item.rut,
                        name: `${item.name} ${item.lastName}`
                      });
                    }}>
                      <DeleteIcon color='error' />
                    </IconButton>
                    <IconButton color='inherit' edge='end' onClick={() => {
                      handleClickOpen(!openDialog);
                      setTmpData({
                        id: item._id,
                        name: item.name,
                        lastName: item.lastName,
                        rut: item.rut,
                        grade: item.grade,
                        specialty: item.specialty,
                        administrativePermission: item.administrativePermission,
                        FLA: item.FLA,
                        area: item.area,
                        role: item.role
                      });
                      setFormData({
                        name: item.name,
                        lastName: item.lastName,
                        rut: item.rut,
                        grade: item.grade,
                        specialty: item.specialty,
                        administrativePermission: item.administrativePermission,
                        FLA: item.FLA,
                        area: item.area,
                        role: item.role
                      })
                    }}>
                      <EditIcon color='info' />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" align="justify" gutterBottom>
            Parte de Alimentación
          </Typography>
        </DialogTitle>
        <DialogContent>
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
                  style={{ marginTop: 22 }}
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
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Actualizar
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseas elimnar este usuario?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="rut">
            Rut: {tmpData.rut}
          </DialogContentText>
          <DialogContentText id="nombre">
            Nombre: {tmpData.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancelar</Button>
          <Button onClick={() => { deleteUser(tmpData.id); handleClose1(); }} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseas habilitar/deshabilitar este usuario?"}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancelar</Button>
          <Button onClick={handleClose2} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>

  );
}

