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
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { es } from 'date-fns/locale'




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
  const usersLocal = JSON.parse(localStorage.getItem('user'))
  const { data: users } = useFetch(`${process.env.REACT_APP_BACKEND}/users-area/${usersLocal.area}`);
  const [sender, setSender] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [date, setDate] = React.useState("");

  const handleChange = (e, index) => {
    let tmp = [...sender];
    tmp[index][e.target.name] = e.target.value;
    setSender(tmp);
  };
  const handleChangeDate = (e) => {
    setDate(e);
  }
  const handleChangeCheck = (e, index) => {
    let tmp = [...sender];
    if (tmp[index][e.target.name] === false) {
      tmp[index][e.target.name] = true;
    } else {
      tmp[index][e.target.name] = false;
    }
    setSender(tmp);
  };
  const handleChangeLunch = (e, index) => {
    let tmp = [...sender];
    if (tmp[index][e.target.name] === false) {
      tmp[index][e.target.name] = true;
    } else {
      tmp[index][e.target.name] = false;
    }
    setSender(tmp);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    savePart(sender);
    toast.success('Parte guardado');
    setIsLoading(false);
  };

  const savePart = async (us) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/save-partchild`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ course: usersLocal.area, date: date, part: us })
    });
    const content = await res.json();
    window.location.reload(true);
    return toast.done('Parte creado exitosamente');
  }
  React.useEffect(() => {
    let arr = [];
    users.map((item) => {
      arr.push({
        grade: item.grade,
        specialty: item.specialty,
        name: item.name,
        lastName: item.lastName,
        rut: item.rut,
        FLA: item.FLA,
        administrativePermissions: item.administrativePermission,
        area: item.area,
        course: item.course,
        lunch: false,
        reason: "",
        checked: false,
        date: ""
      })
    });
    setSender(arr);
  }, [users])
  return (
    <>
      <LocalizationProvider localeText={es} dateAdapter={AdapterDayjs}>
        <DatePicker label="Seleccione fecha"
          disablePast
          localeText={es}
          inputFormat="DD-MM-YYYY"
          format="DD-MM-YYYY"
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            marginBottom: 2,
            padding: 1,
          }}
          onChange={(item) => { handleChangeDate(`${item.$D}/${item.$W}/${item.$y}`); }} />
      </LocalizationProvider>
      <TableContainer component={Paper}>
        <Table
          id="user-grade"
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
            {sender.map((item, index) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  {item.grade}
                </StyledTableCell>
                <StyledTableCell align="center">{item.specialty}</StyledTableCell>
                <StyledTableCell align="left">{item.name}</StyledTableCell>
                <StyledTableCell align="left">{item.lastName}</StyledTableCell>
                <StyledTableCell align="left">{item.rut}</StyledTableCell>
                {/* <StyledTableCell align="center">{item.lunch}</StyledTableCell>
              <StyledTableCell align="center">{item.withMotive}</StyledTableCell>
              <StyledTableCell align="center">{item.reason}</StyledTableCell> */}
                <StyledTableCell align="center">
                  <input type="Checkbox" name="lunch" id="lunch" checked={item.lunch} onClick={(e) => { handleChangeLunch(e, index) }}></input>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <input type="Checkbox" name="checked" id="checked" checked={item.checked} onClick={(e) => { handleChangeCheck(e, index) }}></input>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <select name="reason" disabled={!item.checked} value={item.reason} onChange={(e) => { handleChange(e, index) }}>
                    <option value="Motive1" selected>
                      -
                    </option>
                    <option value="Motive2">228</option>
                    <option value="Motive3">FLA</option>
                    <option value="Motive4">Comisión</option>
                  </select>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={(e) => { handleSubmit(e) }} fullWidth variant="contained" sx={{ mt: 5, mb: 0 }}>
          Ingrese Parte de Alimentación al Sistema
        </Button>
      </TableContainer>
    </>
  );
}

