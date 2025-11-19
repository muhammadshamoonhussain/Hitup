import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
// import { Delete, Edit } from '@mui/icons-material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const columns = [
  { id: "firstname", label: "First Name", minWidth: 100 },
  { id: "lastname", label: "Last Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "gender", label: "Gender", minWidth: 100 },
  { id: "image", label: "Image", minWidth: 100 },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alluser() {
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setsearch] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchuser();
  }, []);
  const fetchuser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/getalluser", {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await res.json();
      setdata(json);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/deleteuser/${id}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await res.json();
      fetchuser();
    } catch (error) {
      console.log(error);
    }
  };

  const searchfilter = data.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container mt-2">
      <h2 className="text-center">User List</h2>
       <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
              <TextField
                label="Search"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                variant="filled"
              />
            </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchfilter.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    <h3>No Data Found</h3>
                  </TableCell>
                </TableRow>
              ) : (
                searchfilter
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "image" ? (
                                <img
                                  src={`http://localhost:5000/upload/${row.image}`}
                                  alt="profile"
                                  width="70"
                                />
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            className="mx-2"
                            onClick={() => HandleDelete(row._id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Alluser;
