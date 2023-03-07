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
import useFetch from '../hooks/useFetch';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




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
  const navigate = useNavigate();
  const usersLocal = JSON.parse(localStorage.getItem('user'))
  const { data: parts } = useFetch(`${process.env.REACT_APP_BACKEND}/part-child`);
  const [sender, setSender] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const coursesString = {
    TI01: 'Primero TI',
    I01: 'Primero I',
    AD01: 'Primero AD',
    TI02: 'Segundo TI',
    I02: 'Segundo I',
    AD02: 'Segundo AD'
  };
  const handleChange = (e, index) => {
    let tmp = [...sender];
    if (tmp[index][e.target.name] === false) {
      tmp[index][e.target.name] = true;
    } else {
      tmp[index][e.target.name] = false;
    }
    setSender(tmp);
  };
  const handleSubmit = e => {
    console.log(sender)
    e.preventDefault();
    let tmp = []
    sender.map((item) => {
      if (item.checked === true) {
        tmp.push({
          course: item.course,
          part: item.part,
          reasonNumber: item.part.length
        });
      }
    })
    savePart(tmp);
    toast.success('Parte guardado');
  };

  const savePart = async (us) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/save-part-bulk`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(us)
    });
    const content = await res.json();
    navigate('/detail-parts');
    return toast.done('Parte creado exitosamente');
  }
  React.useEffect(() => {
    setIsLoading(true);
    let arr = [];
    parts.map((item) => {
      arr.push({
        course: item.course,
        date: item.date,
        part: item.part,
        reasonNumber: item.part.length,
        checked: false
      })
    });
    setSender(arr);
    setIsLoading(false)
  }, [parts])
  return (

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
            <StyledTableCell>Seleccionar </StyledTableCell>
            <StyledTableCell align="center">Curso</StyledTableCell>
            <StyledTableCell align="center">Fecha</StyledTableCell>
            <StyledTableCell align="center">Numero de Motivos</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sender ?
              (
                parts.map((item, index) => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell component="th" scope="row">
                      <input type="Checkbox" name="checked" id={`checked-${item._id}`} checked={item.checked} onClick={(e) => { handleChange(e, index) }}></input>
                    </StyledTableCell>
                    <StyledTableCell align="center">{coursesString[item.course]}</StyledTableCell>
                    <StyledTableCell align="center">{item.date}</StyledTableCell>
                    <StyledTableCell align="center">{item.part.length}</StyledTableCell>
                  </StyledTableRow>
                ))
              )
              : null
          }

        </TableBody>
      </Table>
      <Button onClick={(e) => { handleSubmit(e); }} disabled={sender.filter(i => i.checked === true).length > 0 ? false : true} fullWidth variant="contained" sx={{ mt: 5, mb: 0 }}>
        Publicar Parte de Alimentación
      </Button>
    </TableContainer>
  );
}

