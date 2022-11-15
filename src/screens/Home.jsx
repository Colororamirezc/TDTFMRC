import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Types() {
  return (
    <Box sx={{ width: '100%', maxWidth: 2000 }}>
      <Typography variant="h2" align="justify" gutterBottom>
       Parte de Alimentación
      </Typography>
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
    </Box>
  );
}