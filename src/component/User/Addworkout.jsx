import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useThemeColor } from "../Context/Themecolor";
import { useNavigate } from "react-router-dom";

function Addworkout() {
    const {bgcolor,usercolor,textcolor,usertextcolor} = useThemeColor()
    const navigate = useNavigate()

  const [data, setdata] = useState({
    category: "",
    exercisesname: "",
    sets: "",
    reps: "",
    weight: "",
    notes: "",
    date: "",
  });

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/workout/addworkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      await res.json();
      alert("Workout Added!");
      setdata({
        category: "",
        exercisesname: "",
        sets: "",
        reps: "",
        weight: "",
        notes: "",
        date: "",
      });
      navigate("/workoutlist")
    } catch (error) {
      console.log(error);
    }
  };

  const HandleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" mb={2} fontWeight="bold" style={{color:"#000"}}>
          Add Workout
        </Typography>

        <Box
          component="form"
          onSubmit={HandleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField label="Exercise Name" name="exercisesname" value={data.exercisesname} onChange={HandleChange} variant="filled" />
          <TextField label="Sets" name="sets" type="number" value={data.sets} onChange={HandleChange} variant="filled" />
          <TextField label="Reps" name="reps" type="number" value={data.reps} onChange={HandleChange} variant="filled" />
          <TextField label="Weight (kg)" name="weight" type="number" value={data.weight} onChange={HandleChange} variant="filled" />
          <TextField label="Notes" name="notes" value={data.notes} onChange={HandleChange} variant="filled" />
          <TextField
            name="category"
            select
            SelectProps={{ native: true }}
            value={data.category}
            onChange={HandleChange}
            variant="filled"
          >
            <option value="">Select Category</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
            <option value="flexibility">Flexibility</option>
          </TextField>
          <TextField label="Date" name="date" type="date" value={data.date} onChange={HandleChange} variant="filled" InputLabelProps={{ shrink: true }} />

          <Button type="submit" variant="contained" sx={{ bgcolor: bgcolor,color:textcolor }}>
            Add Workout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Addworkout;
