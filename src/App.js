import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

import React from "react";
import { Button } from "@material-ui/core";
import ContainedButtons from "./Button";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: "",
    };
  }
  componentDidMount() {
    /*fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((result) => {
        this.setState({ users: result });
      });*/
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      console.log(JSON.stringify(res));
      this.setState({ users: res.data });
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name: this.state.name,
      })
      .then((res) => {
        console.log(JSON.stringify(res));
      });
  };
  handleTextChange = (e) => {
    this.setState({ name: e.target.value });
  };
  render() {
    return (
      <div>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            style={{ width: "300px", height: "40px" }}
            id="outlined-basic"
            label="Enter Name"
            variant="outlined"
            onChange={this.handleTextChange}
          />
          <Button variant="contained" color="primary">
            Save
          </Button>
        </form>
        {this.TableComponent()}
      </div>
    );
  }

  TableComponent() {
    return (
      <TableContainer component={Paper}>
        <ContainedButtons />
        <ContainedButtons />
        <ContainedButtons />
        <ContainedButtons />
        <Table style={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email ID</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="left">Website</TableCell>
              <TableCell align="left">Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.website}</TableCell>
                <TableCell align="left">
                  {row.address.street +
                    ", " +
                    row.address.city +
                    ", " +
                    row.address.zipcode}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default App;
