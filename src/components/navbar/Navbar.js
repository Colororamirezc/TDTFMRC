import React from 'react';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, DrawerHeader, drawerWidth } from './styles/styles';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { AccountCircle } from '@mui/icons-material';

const Navbar = ({ open, setOpen }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('home');
  };
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleCloseDrop = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDrop1 = () => {
    setAnchorEl1(null);
  };
  const handleMenu1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  if (!user)
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton color='inherit' edge='end' onClick={() => navigate('login')}>
              <Typography variant='h6' component='div'>
                Ingrese Usuario
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <div>
              <MenuItem key={0} onClick={handleMenu} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography textAlign="center">Parte de Alimentación</Typography>
              </MenuItem>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseDrop}
              >
                <MenuItem key={1} onClick={() => navigate('parte')} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography textAlign="center">Ingresar Parte</Typography>
                </MenuItem>
                {user.role === 'admin' && (
                  <MenuItem key={2} onClick={() => navigate('/general-parts')} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography textAlign="center">Publicar Parte</Typography>
                  </MenuItem>
                )}
                {user.role === 'admin' && (
                  <MenuItem key={3} onClick={() => navigate('/detail-parts')} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography textAlign="center">Resumen Partes</Typography>
                  </MenuItem>
                )}
                <Divider />
                <MenuItem key={2} onClick={() => navigate('reasons')} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography textAlign="center">Adminstración de Motivos</Typography>
                </MenuItem>
              </Menu>
            </div>
            {user.role === 'admin' && (
              <div>
                <MenuItem key={0} onClick={handleMenu1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography textAlign="center">Usuarios</Typography>
                </MenuItem>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl1}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl1)}
                  onClose={handleCloseDrop1}
                >
                  <MenuItem key={1} onClick={() => navigate('admin-users')} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography textAlign="center">Administrar Usuarios</Typography>
                  </MenuItem>
                </Menu>
              </div>
            )}
            <MenuItem key={2} onClick={() => { handleClickOpen(!openDialog) }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography textAlign="center">Información</Typography>
            </MenuItem>
          </Box>
          <IconButton color='inherit' edge='end' onClick={onLogout}>
            <LogoutIcon />
            <Typography variant='h6'>Salir</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h4" align="justify" gutterBottom>
            Parte de Alimentación
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" align="justify" gutterBottom>
            Siga las siguientes instrucciones para poder ingresar el Parte de Alimentación de su respectivo curso.
          </Typography>
          <Typography variant="subtitle2" align="justify" gutterBottom>
            1.- Despliegue las opciones de la barra de navegación al costado de "Parte de Alimentación".
          </Typography>
          <Typography variant="subtitle2" align="justify" gutterBottom>
            2.- Seleccione "Ingrese Parte de Alimentación."
          </Typography>
          <Typography variant="subtitle2" align="justify" gutterBottom>
            3.- Seleccione al personal que almorzará en la Unidad.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            4.- El personal que no almuerce debe ingresar si posea motivo o no, y de poseer motivo ingresar cual es este.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            5.- Finalmente, hacer click en el botón "Ingrese Parte de Alimentación al Sistema".
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Navbar;
