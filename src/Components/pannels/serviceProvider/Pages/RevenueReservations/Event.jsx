import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Event(props) {
  let userId = props.id;

  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    fetch(
      `https://alphax-api.azurewebsites.net/api/eventplannerservicereservations` 
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        responseData = responseData.filter(item => item.cancellation == null && item.eventPlannerService.userID === userId);
            setEventList(responseData);
      });
  }, [userId]);

  const classes = useStyles();



  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Event Name</StyledTableCell>
              <StyledTableCell align="right">CustomerID</StyledTableCell>
            <StyledTableCell align="right">Adult Tickets</StyledTableCell>
            <StyledTableCell align="right">Child Tickets</StyledTableCell>
            <StyledTableCell align="right">CheckIn</StyledTableCell>
              <StyledTableCell align="right">Venue</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Payment ID</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventList.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.eventPlannerService.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.userID}</StyledTableCell>
                {((row.adultTikets===0) && (row.kidTikets===0))?<StyledTableCell align="right">{row.numOfTravellers}</StyledTableCell>:<StyledTableCell align="right">{row.adultTikets}</StyledTableCell>}
              <StyledTableCell align="right">{row.kidTikets}</StyledTableCell>
              <StyledTableCell align="right">{row.checkIn}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.eventPlannerService.venue}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.price}$
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.paymentID}
                </StyledTableCell>
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
