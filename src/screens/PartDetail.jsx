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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import DeleteIcon from '@mui/icons-material/Delete';
import { da, es } from 'date-fns/locale'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";




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
  const { data: parts } = useFetch(`${process.env.REACT_APP_BACKEND}/part-child`);
  const [prt, setPrt] = React.useState([]);
  const [sender, setSender] = React.useState([]);
  const [refe, setRefe] = React.useState([]);
  const [tmpData, setTmpData] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);
  const [openDialog1, setOpenDialog1] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [date, setDate] = React.useState("");

  const coursesString = {
    TI01: 'Primero TI',
    I01: 'Primero I',
    AD01: 'Primero AD',
    TI02: 'Segundo TI',
    I02: 'Segundo I',
    AD02: 'Segundo AD'
  };

  const handleChangeDate = (e) => {
    setDate('');
    setDate(e);
  }
  const motives = {
    Motive2: '228',
    Motive3: 'FLA',
    Motive4: 'Comisión'
  }

  const handleChange = (name, e, index) => {
    let tmp = [...sender];
    tmp[index][name] = e;
    setSender(tmp);
  };
  const handleSubmit = e => {
    console.log(sender)
    e.preventDefault();
    setIsLoading(true);
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
    setSender()
    toast.success('Parte guardado');
    setIsLoading(false);
  };
  const deletePart = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/delete-partchild`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });
    const content = await res.json();
    window.location.reload(true);
    return toast.done('Parte eliminado exitosamente');
  }
  const handleClickOpen1 = () => {
    setOpenDialog1(true);
  };
  const handleClose1 = () => {
    setOpenDialog1(false);
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
    window.location.reload();
    return toast.done('Parte creado exitosamente');
  }
  const getByDate = async () => {
    const data = await fetch(`${process.env.REACT_APP_BACKEND}/part-child-date`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date: date })
    });
    const resp = await data.json()
    setPrt(resp)
  }
  React.useEffect(() => {
    if (date.length > 0) {
      getByDate();
    }
  }, [date])
  React.useEffect(() => {
    let arr = [];
    prt.map((item) => {
      arr.push({
        _id: item._id,
        course: item.course,
        part: item.part,
        date: item.date,
        normal: 0,
        s228: 0,
        fla: 0,
        comis: 0,
        checked: false
      })
    });
    setSender(arr);
    setRefe(arr);
  }, [prt])
  React.useEffect(() => {
    let arr = [];
    parts.map((item) => {
      arr.push({
        _id: item._id,
        course: item.course,
        part: item.part,
        date: item.date,
        normal: 0,
        s228: 0,
        fla: 0,
        comis: 0,
        checked: false
      })
    });
    setSender(arr);
    setRefe(arr);
  }, [parts])
  React.useEffect(() => {
    sender.map((item, index) => {
      let normals = 0;
      let t228 = 0;
      let sfla = 0;
      let comi = 0;
      item.part.map((i) => {
        if (i.lunch === true) {
          normals = normals + 1;
        }
        if (i.lunch === false && i.reason === 'Motive2') {
          t228 = t228 + 1;
        }
        if (i.lunch === false && i.reason === 'Motive3') {
          sfla = sfla + 1;
        }
        if (i.lunch === false && i.reason === 'Motive4') {
          comi = comi + 1;
        }
      })
      handleChange('normal', normals, index);
      handleChange('s228', t228, index);
      handleChange('fla', sfla, index);
      handleChange('comis', comi, index);
    })
  }, [refe])
  return (

    <>

      <LocalizationProvider localeText={es} dateAdapter={AdapterDayjs}>
        <DatePicker label="Filtrar por fecha"
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
              <StyledTableCell align="center">Curso</StyledTableCell>
              <StyledTableCell align="center">Fecha</StyledTableCell>
              <StyledTableCell align="center">Actividad Normal {`(Almuerzan)`}</StyledTableCell>
              <StyledTableCell align="center">228</StyledTableCell>
              <StyledTableCell align="center">FLA</StyledTableCell>
              <StyledTableCell align="center">Comisión</StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sender.map((item, index) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell align="center">{coursesString[item.course]}</StyledTableCell>
                <StyledTableCell align="center">{item.date}</StyledTableCell>
                <StyledTableCell align="center">{item.normal}</StyledTableCell>
                <StyledTableCell align="center">{item.s228}</StyledTableCell>
                <StyledTableCell align="center">{item.fla}</StyledTableCell>
                <StyledTableCell align="center">{item.comis}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton color='inherit' edge='end' onClick={() => {
                    handleClickOpen1(!openDialog1);
                    setTmpData({
                      id: item._id,
                      course: item.course,
                    });
                  }}>
                    <DeleteIcon color='error' />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseas elimnar este parte?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="course">
            Curso: {coursesString[tmpData.course]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancelar</Button>
          <Button onClick={() => { deletePart(tmpData.id); handleClose1(); }} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

