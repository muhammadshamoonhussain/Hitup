import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, Paper, TextField } from "@mui/material";
import { Download, Edit } from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useThemeColor } from "../Context/Themecolor";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NutritionList({ empid }) {
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState("");
  const [edit, setedit] = useState({
     category:"",
            foodname:"",
            quantity:"",
            calories:"",
            protein:"",
            carbs:"",
            fats:"",
            date:""
  });
  const [selected,setselected] = useState(null);
  const [open, setOpen] = React.useState(false);
  const {bgcolor,usercolor,textcolor,usertextcolor} = useThemeColor()
      
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

  useEffect(() => {
    fetchnutrition();
  }, []);

  const fetchnutrition = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/nutrition/getnutrition/${empid}`,
        {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await res.json();
      console.log(json);

      setdata(json);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteHandle = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/nutrition/deletenutrition/${id}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await res.json();
      fetchnutrition();
    } catch (error) {
      console.log(error);
    }
  };

  const searchfilter = data.filter((row) =>
    row.foodname.toLowerCase().includes(search.toLowerCase())
  );


  const exportcsv = () => {
    const header = ["Category","Food Name","Quantity","Calories","Protein","Carbs","Fats","Date"]
    const row = data.map(w => `${w.category},${w.foodname},${w.quantity},${w.calories},${w.protein},${w.carbs},${w.fats},${w.date}`)
    
    const csvcontent = [header,...row].join("\n")
    const blob = new Blob([csvcontent],{type: "text/csv;charset=utf-8;"})
    const url = URL.createObjectURL(blob)
    
    
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download","Nutrition_Report.csv")
    link.click()

  }

const HandleChangeValue = (com) =>{
  setselected(com)
  setedit({
     category:com.category, 
        foodname: com.foodname,
        quantity: com.quantity,
        calories: com.calories,
        protein: com.protein,
        carbs: com.carbs,
        fats: com.fats,
        date: com.date,
  })
  handleClickOpen();

} 

const HandleSubmit = async (id) =>{
  try {
    const res = await fetch(`http://localhost:5000/api/nutrition/editnutrition/${id}`,{
      method:"PUT",
        headers:{
              "Content-Type": "application/json",
             "auth-token": localStorage.getItem("token"),
             },
             body:JSON.stringify(edit)
    })
    const json = await res.json()
  handleClose();
      fetchnutrition();

  } catch (error) {
    console.log(error);
    
  }
}

const HandleChange = (e) =>{
  setedit({...edit,[e.target.name]:e.target.value});
}


  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, width: "100%", maxWidth: "1200px", border: 1 }}
      >
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mb={2}
        >
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            variant="filled"
          />
        </Box>
        <Button size="small" href="/nutrition" style={{color:"#000"}}>
          <Edit /> Add Nutrition
        </Button>
        <Button size="small" onClick={exportcsv} style={{color:"#000"}}>
          <Download /> Generate Report
        </Button>

        <Grid container spacing={3}>
          {searchfilter.length === 0 ? (
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center", Padding: 40 ,color:"#000"}}
            >
              <h3>No Data Found</h3>
            </Grid>
          ) : (
            searchfilter.map((item) => (
              <Grid container item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{ width: 500, display: "flex", flexDirection: "column" }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      mb={2}
                      fontWeight="bold"
                      style={{color:"#000"}}
                      component="div"
                    >
                      {item.foodname}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 1 }}
                    >
                      <b>Category: </b>
                      {item.category}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        gap: 20,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        <b>Quantity: </b>
                        {item.quantity} | <b>Calories: </b>
                        {item.calories}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        gap: 20,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        <b>Carbs: </b>
                        {item.carbs} | <b>Protein: </b>
                        {item.protein}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        gap: 20,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        <b>Fats: </b>
                        {item.fats} | <b>Date: </b>
                        {new Date(item.date).toLocaleDateString()}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => HandleChangeValue(item)}>Edit</Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => DeleteHandle(item._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Paper>
        <React.Fragment>
            <Dialog
              open={open}
              slots={{
                transition: Transition,
              }}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Update Workout"}</DialogTitle>
              <DialogContent>
         <Box
                    component="form"
                    onSubmit={HandleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField label="Food Name" name="foodname" value={edit.foodname} onChange={HandleChange} variant="filled" />
                    <TextField label="Quantity" name="quantity" type="number" value={edit.quantity} onChange={HandleChange} variant="filled" />
                    <TextField label="Calories" name="calories" type="number" value={edit.calories} onChange={HandleChange} variant="filled" />
                    <TextField label="Protein" name="protein" type="number" value={edit.protein} onChange={HandleChange} variant="filled" />
                    <TextField label="Carbs" name="carbs" type="number" value={edit.carbs} onChange={HandleChange} variant="filled" />
                    <TextField label="Fats" name="fats" type="number" value={edit.fats} onChange={HandleChange} variant="filled" />
                    <TextField
                      name="category"
                      select
                      SelectProps={{ native: true }}
                      value={edit.category}
                      onChange={HandleChange}
                      variant="filled"
                    >
                      <option value="">Select Category</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snacks">Snacks</option>
                    </TextField>
                    <TextField label="Date" name="date" type="date" value={edit.date} onChange={HandleChange} variant="filled" InputLabelProps={{ shrink: true }} />
 </Box>     
  </DialogContent>
         <DialogActions>
           <Button onClick={handleClose}>Close</Button>
           <Button onClick={(e) => HandleSubmit(selected._id,e)} >Update</Button>
         </DialogActions>
       </Dialog>
     </React.Fragment>
    </Box>
  );
}

export default NutritionList;
