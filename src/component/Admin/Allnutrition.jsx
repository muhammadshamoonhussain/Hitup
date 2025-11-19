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
import { Box, TextField } from "@mui/material";

const columns = [
  { id: "userid", label: "User Id", minWidth: 100 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "foodname", label: "Food Name", minWidth: 100 },
  { id: "quantity", label: "Quantity", minWidth: 100 },
  { id: "calories", label: "Calories", minWidth: 100 },
  { id: "protein", label: "Protein", minWidth: 100 },
  { id: "carbs", label: "Carbs", minWidth: 100 },
  { id: "fats", label: "Fats", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 100 },
];

function Allnutrition() {

    
          const [data, setdata] = useState([]);
          const [page, setPage] = useState(0);
          const [search, setsearch] = useState("");
            
          const [rowsPerPage, setRowsPerPage] = useState(10);
        
          const handleChangePage = (event, newPage) => {
            setPage(newPage);
          };
        
          const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
          };
        
          useEffect(() => {
              fetchnutrition()
            }, []);
            const fetchnutrition = async () => {
              try {
                const res = await fetch("http://localhost:5000/api/nutrition/getallnutrition", {
                  method: "GET",
                  headers: {
                    "auth-token": localStorage.getItem("token"),
                  },
                });
                const json = await res.json()
                setdata(json)
              } catch (error) {
                console.log(error);
                
              }
            };
    
            const HandleDelete = async (id) =>{
             try {
              const res = await fetch(`http://localhost:5000/api/nutrition/alldeletenutrition/${id}`,{
                method:"DELETE",
                 headers: {
                "auth-token": localStorage.getItem("token"),
              },
            })
             const json = await res.json()
             fetchnutrition()
             } catch (error) {
              console.log(error);
              
             }
            }

            const searchfilter = data.filter((row)=>
            Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
            ) 
  return (
      <div className="container mt-2">
              <h2 className="text-center">Nutrition List</h2>
              <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>

          <TextField label="Search" value={search} 
          onChange={(e) => setsearch(e.target.value)} variant="filled" />
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
                            <b>{column.label}</b>
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
                            .map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                    <TableCell key={column.id}>
                                        {column.id === "date"
                                        ? new Date(row.date).toLocaleDateString()
                                        : value}
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
                            ))
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
  )
}

export default Allnutrition
