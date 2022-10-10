import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

function createData(grade, specialty, name, rut, lunch, reason) {
  return { grade, specialty, name, rut, lunch, reason };
}

const rows = [
  createData("STE", "(TI)", "Luis Chamorro Soto", "19.524.920-2", "SI", "-"),
  createData(
    "STE",
    "(TI)",
    "Matías Ramírez Cisternas",
    "19.469.189-0",
    "SI",
    "-"
  ),
  createData(
    "STE",
    "(TI)",
    "Daniel Valdivia Faúndez",
    "19.716.744-0",
    "SI",
    "-"
  ),
  createData(
    "STE",
    "(TI)",
    "Gonzalo Fuentes Gesell",
    "19.366.717-1",
    "NO",
    "BALCE"
  ),
  createData("STE", "(TI)", "Esteban Vera Garrido", "19.154.446-3", "SI", "-"),
  createData(
    "STE",
    "(TI)",
    "Cristobal Careaga Zapata",
    "19.700.925-K",
    "SI",
    "-"
  ),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Grado </StyledTableCell>
            <StyledTableCell align="center">Especialidad</StyledTableCell>
            <StyledTableCell align="left">Nombre</StyledTableCell>
            <StyledTableCell align="left">Rut</StyledTableCell>
            <StyledTableCell align="center">Almuerzo</StyledTableCell>
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
              <StyledTableCell align="left">{row.rut}</StyledTableCell>
              <StyledTableCell align="center">{row.lunch}</StyledTableCell>
              <StyledTableCell align="center">{row.reason}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
