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

function createData(
  grade,
  specialty,
  name,
  lastName,
  rut,
  lunch,
  withMotive,
  reason
) {
  return { grade, specialty, name, lastName, rut, lunch, withMotive, reason };
}

const rows = [
  createData(
    "STE",
    "(TI)",
    "Luis",
    "Chamorro",
    "19.524.920-2",
    <input type="Checkbox"></input>,
    <input type="Checkbox"></input>,
    <select name="select">
      <option value="Motive1" selected>
        -
      </option>
      <option value="Motive2">228</option>
      <option value="Motive3">FLA</option>
      <option value="Motive4">Comisión</option>
    </select>
  ),
  createData(
    "STE",
    "(TI)",
    "Matías",
    "Ramírez",
    "19.469.189-0",
    <input type="Checkbox"></input>,
    <input type="Checkbox"></input>,
    <select name="select">
      <option value="Motive1" selected>
        -
      </option>
      <option value="Motive2">228</option>
      <option value="Motive3">FLA</option>
      <option value="Motive4">Comisión</option>
    </select>
  ),
  createData(
    "STE",
    "(TI)",
    "Daniel",
    "Valdivia",
    "19.716.744-0",
    <input type="Checkbox"></input>,
    <input type="Checkbox"></input>,
    <select name="select">
      <option value="Motive1" selected>
        -
      </option>
      <option value="Motive2">228</option>
      <option value="Motive3">FLA</option>
      <option value="Motive4">Comisión</option>
    </select>
  ),
  createData(
    "STE",
    "(TI)",
    "Gonzalo",
    "Fuentes",
    "19.366.717-1",
    <input type="Checkbox"></input>,
    <input type="Checkbox"></input>,
    <select name="select">
      <option value="Motive1" selected>
        -
      </option>
      <option value="Motive2">228</option>
      <option value="Motive3">FLA</option>
      <option value="Motive4">Comisión</option>
    </select>
  ),
  createData(
    "STE",
    "(TI)",
    "Esteban",
    "Vera",
    "19.154.446-3",
    <input type="Checkbox"></input>,
    <input type="Checkbox"></input>,
    <select name="select">
      <option value="Motive1" selected>
        -
      </option>
      <option value="Motive2">228</option>
      <option value="Motive3">FLA</option>
      <option value="Motive4">Comisión</option>
    </select>
  ),
  createData(
    "STE",
    "(TI)",
    "Cristobal",
    "Careaga",
    "19.700.925-K",
    <input type="Checkbox"></input>,
    <input type="Checkbox"></input>,
    <select name="select">
      <option value="Motive1" selected>
        -
      </option>
      <option value="Motive2">228</option>
      <option value="Motive3">FLA</option>
      <option value="Motive4">Comisión</option>
    </select>
  ),
];

export default function CustomizedTables() {
  return (
    
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
            <StyledTableCell>Grado </StyledTableCell>
            <StyledTableCell align="center">Especialidad</StyledTableCell>
            <StyledTableCell align="left">Nombre</StyledTableCell>
            <StyledTableCell align="left">Apellido</StyledTableCell>
            <StyledTableCell align="left">Rut</StyledTableCell>
            <StyledTableCell align="center">Almuerzo</StyledTableCell>
            <StyledTableCell align="center">¿Con Motivo?</StyledTableCell>
            <StyledTableCell align="center">Motivo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.grade}
              </StyledTableCell>
              <StyledTableCell align="center">{row.specialty}</StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.lastName}</StyledTableCell>
              <StyledTableCell align="left">{row.rut}</StyledTableCell>
              <StyledTableCell align="center">{row.lunch}</StyledTableCell>
              <StyledTableCell align="center">{row.withMotive}</StyledTableCell>
              <StyledTableCell align="center">{row.reason}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 0 }}>
        Ingrese Parte de Alimentación al Sistema
      </Button>
    </TableContainer>
  );
}

