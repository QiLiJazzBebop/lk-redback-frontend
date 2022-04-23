/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import DrawerRouterContainer from "./layout/DrawerRouterContainer";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/_home.scss";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Box,
  TablePagination,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
// import Qs from "qs";
// import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
// import FastForwardIcon from "@material-ui/icons/FastForward";
// import CakeIcon from "@material-ui/icons/Cake";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
// import TimerIcon from "@material-ui/icons/Timer";
// import CallSplitIcon from "@material-ui/icons/CallSplit";
// import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#304652",
      color: theme.palette.common.white,
      fontSize: 16,
      fontWeight: 550,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function createData(
    name: any,
    date: number,
    calories: number,
    avg_heart_rate: number,
    total_distance: number,
    avg_speed: number
) {
  return { name, date, calories, avg_heart_rate, total_distance, avg_speed };
}
const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const apiUrl = process.env.REACT_APP_API_URL;

const Dashboard = (props) => {
  const classes = useStyles();
  const location = useLocation();
  let username;
  let user;
  let obj;
  const [isShow, setIsShow] = useState(false);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState('date');//set order by others
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([] as any);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log("cmd", location);

  if (location.state) {
    console.log(props);
    username = location.state.username;
    user = location.state.user;
    console.log("user is", username);
  }

  const getActivity = () => {
    let bodyFormData = new FormData();
    bodyFormData.set("username", username);
    axios({
      method: "GET",
      url: `${apiUrl}/activity/getActivityByUsername`,
      headers: {
        Accept: "application/json",
      },
      params: { username: username },
    })
      .then((res) => {
        obj = res.data;
        console.log(obj);
        obj.forEach((element) => {
          console.log(element);
          setRows((rows) => [
            ...rows,
            createData(
                element.activityType,
                element.startTimeInSeconds,
                element.activeKilocalories,
                element.averageHeartRateInBeatsPerMinute,
                element.distanceInMeters,
                element.averageSpeedInMetersPerSecond
            ),
          ]);
        });
        // then alert
        if (res.data.length === 0) {
          setIsShow(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getActivity();
  }, []);

  const goHome = () => {
    if (username) {
      props.history.push({
        pathname: "/home",
        state: { username: username, user: user },
      });
    }
  };
  const goActivity = (id: number) => {
    if (username) {
      props.history.push({
        pathname: `/activity/${id + 1}`,
        state: { username: username, user: user },
      });
    }
  };

  return username == null ? (
    <a href="/">
      <h2>Please log in first! :)</h2>
    </a>
  ) : (
    <DrawerRouterContainer>
      <div
        className="dash"
        style={{ backgroundColor: "#F0FFFF", opacity: 0.8 }}
      >
        <h2>
          <DirectionsRunIcon fontSize="large" className="m-2" />
          <b>Hello {username}, you can view your activity data here!</b>
        </h2>
        <Button
          variant="light"
          className="mb-3 mx-3 button-home"
          onClick={goHome}
        >
          Return to home page
        </Button>
        {isShow ? (
          <Alert severity="warning">
            Oops! Seems you haven't uploaded any activity yet!
          </Alert>
        ) : (
          <>
            <Box ml={2} mr={2} mt={2}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Activity</StyledTableCell>
                      <StyledTableCell align="right">
                        Date&nbsp;
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Calories&nbsp;(00)
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        avg_heart_rate&nbsp;(bpm)
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        total_distance&nbsp;(m)
                      </StyledTableCell>
                      <StyledTableCell align="right">avg_speed</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, id: number) => (
                        <StyledTableRow key={id} onClick={() => goActivity(page * rowsPerPage + id)}>
                          <StyledTableCell component="th" scope="row">
                            {id + 1}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.date}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.calories}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.avg_heart_rate}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.total_distance}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.avg_speed}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </>
        )}
      </div>
    </DrawerRouterContainer>
  );
};

export default withRouter(Dashboard);
