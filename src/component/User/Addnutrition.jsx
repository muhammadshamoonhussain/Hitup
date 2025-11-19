import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useThemeColor } from "../Context/Themecolor";

function Addnutrition() {

    const [data,setdata] = useState({
          category:"",
            foodname:"",
            quantity:"",
            calories:"",
            protein:"",
            carbs:"",
            fats:"",
            date:""
    });
    const {bgcolor,usercolor,textcolor,usertextcolor} = useThemeColor()
    

    const HandleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:5000/api/nutrition/addnutrition",{
                method:"POST",
                 headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body:JSON.stringify(data)
            });
            const json = await res.json();
            alert("Nutrition Add Successfully");
            setdata(json || {
                category:"",
            foodname:"",
            quantity:"",
            calories:"",
            protein:"",
            carbs:"",
            fats:"",
            date:""
            })

        } catch (error) {
            console.log(error);
            
        }
    }

    const HandleChange = (e) =>{
        setdata({...data,[e.target.name]:e.target.value})
    }

  return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
            <Typography variant="h5" mb={2} fontWeight="bold" style={{color:"#000"}}>
              Add Nutrition
            </Typography>
    
            <Box
              component="form"
              onSubmit={HandleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField label="Food Name" name="foodname" value={data.foodname} onChange={HandleChange} variant="filled" />
              <TextField label="Quantity" name="quantity" type="number" value={data.quantity} onChange={HandleChange} variant="filled" />
              <TextField label="Calories" name="calories" type="number" value={data.calories} onChange={HandleChange} variant="filled" />
              <TextField label="Protein" name="protein" type="number" value={data.protein} onChange={HandleChange} variant="filled" />
              <TextField label="Carbs" name="carbs" type="number" value={data.carbs} onChange={HandleChange} variant="filled" />
              <TextField label="Fats" name="fats" type="number" value={data.fats} onChange={HandleChange} variant="filled" />
              <TextField
                name="category"
                select
                SelectProps={{ native: true }}
                value={data.category}
                onChange={HandleChange}
                variant="filled"
              >
                <option value="">Select Category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
              </TextField>
              <TextField label="Date" name="date" type="date" value={data.date} onChange={HandleChange} variant="filled" InputLabelProps={{ shrink: true }} />
    
              <Button type="submit" variant="contained" sx={{ bgcolor: bgcolor,color:textcolor }}>
                Add Nutrition
              </Button>
            </Box>
          </Paper>
        </Box>
  )
}

export default Addnutrition
