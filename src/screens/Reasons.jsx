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
  const { data: reason } = useFetch(`${process.env.REACT_APP_BACKEND}/reason`);
  const [tmpData, setTmpData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialog1, setOpenDialog1] = React.useState(false);
  const [openDialog2, setOpenDialog2] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
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
    saveReason({
      name: formData.name
    });
    toast.success('Motivo creado con éxito');
    setFormData({
      name: '',
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
  const deleteReason = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/delete-reason`, {
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
  const saveReason = async (us) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/save-reason`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(us)
    });
    const content = await res.json();
    window.location.reload(true);
    return toast.done('Motivo creado exitosamente');
  }
  const updateReason = async (us) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/update-reason`, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(us)
    });
    const content = await res.json();
    window.location.reload(true);
    return toast.done('Motivo actualizado exitosamente');
  }
  return (
    <Container>
      <Button onClick={() => { handleClickOpen1(!openDialog1); setFormData({ name: '' }) }} style={{ width: '30vh', alignSelf: 'center', margin: 5 }} variant="contained" sx={{ mt: 1, mb: 0 }}>
        Crear Motivo
      </Button>
      <TableContainer component={Paper}>
        <Table
          sx={{
            marginTop: 8,
            flexDirection: "column",
            justifyContent: "center",
            margin: "auto",
            alignItems: "center",
            minWidth: '100vh',
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre </StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              reason.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell component="th" scope="row">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton color='inherit' edge='end' onClick={() => {
                      handleClickOpen2(!openDialog2);
                      setTmpData({
                        id: item._id,
                        name: item.name,
                      });
                    }}>
                      <DeleteIcon color='error' />
                    </IconButton>
                    <IconButton color='inherit' edge='end' onClick={() => {
                      handleClickOpen(!openDialog);
                      setTmpData({
                        id: item._id,
                        name: item.name,
                      });
                      setFormData({
                        name: item.name,
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
              <Grid item xs={20}>
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
            </Grid>
            <Button onClick={() => { updateReason({id: tmpData.id, name: formData.name }) }} fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Actualizar
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose() }} autoFocus>
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
          <Typography variant="h6" align="justify" gutterBottom>
            Motivo
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box component='form' noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2} columns={20}>
              <Grid item xs={20}>
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
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Guardar Motivo
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" align="justify" gutterBottom>
            Eliminar Motivo
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="name">
            Nombre: {tmpData.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { deleteReason(tmpData.id); handleClose2(); }}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </Container>

  );
}

