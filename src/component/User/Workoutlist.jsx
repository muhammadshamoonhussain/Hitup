import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, Paper, TableCell, TableRow, TextField } from "@mui/material";
import { Download, Edit, Padding } from "@mui/icons-material";
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

function Workoutlist({ empid }) {
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState("");
  const [activeworkout,setactiveworkout] = useState(null);
  const [reps,setreps] = useState(0);
  const [sets,setsets] = useState(0);
  const [running,setrunning] = useState(false);
  const [edit,setedit] = useState({
     category: "",
        exercisesname: "",
        sets: "",
        reps: "",
        weight: "",
        notes: "",
        date: "",
  });
  const [selected,setselected] = useState(null)
    const [open, setOpen] = React.useState(false);
        const {bgcolor,usercolor,textcolor,usertextcolor} = useThemeColor()
    

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    fetchworkout();
  }, []);

  const fetchworkout = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/workout/getworkout/${empid}`,
        {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await res.json();        
      setdata(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
   let timer;
   if (running && activeworkout) {
    const workout = data.find((w) => w._id === activeworkout)
    if (!workout) return;

    const totalreps = workout.sets * workout.reps;
    const donereps = sets * workout.reps + reps
    const progress = Math.round((donereps/totalreps) * 100 )

    PatchHandle(workout._id,progress)
    
    if (sets < workout.sets) {
      if (reps < workout.reps) {
        timer = setTimeout(() => {
          setreps((r) => r + 1)
        }, 1000);
      }
      else{
        setTimeout(() => {
          setsets((s) => s + 1)
          setreps(0)
        }, 1000);
      }
    }
    else{
      setrunning(false)
          PatchHandle(workout._id,100,true)

    }
   }
   return () => clearTimeout(timer);
  },[running,sets,reps,activeworkout])


  const startworkout= (id)=>{
setactiveworkout(id)
setsets(0)
setreps(0)
setrunning(true)
PatchHandle(id)

}

  const DeleteHandle = async (id) =>{
        try {
            const res = await fetch(`http://localhost:5000/api/workout/deleteworkout/${id}`,{
             method:"DELETE",
             headers:{
             "auth-token": localStorage.getItem("token"),
             }
            })
            const json = await res.json();
            fetchworkout();
        } catch (error) {
            console.log(error);
            
        }
      }
  const PatchHandle = async (id,progress,completed = false) =>{
        try {
            const res = await fetch(`http://localhost:5000/api/workout/patchworkout/${id}`,{
             method:"PATCH",
             headers:{
              "Content-Type": "application/json",
             "auth-token": localStorage.getItem("token"),
             },
             body:JSON.stringify({progress,completed})
            })
            const json = await res.json();

            if (completed) {
              await fetch(`http://localhost:5000/api/notification/addnotify`,{
             method:"POST",
             headers:{
              "Content-Type": "application/json",
             "auth-token": localStorage.getItem("token"),
             },
             body:JSON.stringify({
              userid:empid,
              message:"Workout completed successfully 💪",
              type:"Workout", 
            })
            });
            }
            fetchworkout();
        } catch (error) {
            console.log(error);
            
        }
      }

      const searchfilter = data.filter((row) =>
     row.exercisesname.toLowerCase().includes(search.toLowerCase())
      )

const exportcsv = () =>{
  const header = ["Category","Exercises Name","Sets","Reps","Weight","Notes","Date"]
  const row = data.map(w => `${w.category},${w.exercisesname},${w.sets},${w.reps},${w.weight},${w.notes},${w.date}`)

  const csvcontent = [header,...row].join("\n")
  const blob = new Blob([csvcontent],{type: "text/csv;charset=utf-8;"})
  const url = URL.createObjectURL(blob);


  const link = document.createElement("a");
  link.href = url
  link.setAttribute("download","Workout_Report.csv")
  link.click();
}


const HandleChangeValue = (com) =>{
  setselected(com)
  setedit({
     category:com.category, 
        exercisesname: com.exercisesname,
        sets: com.sets,
        reps: com.reps,
        weight: com.weight,
        notes: com.notes,
        date: com.date,
  })
  handleClickOpen();

} 

const HandleSubmit = async (id) =>{
  try {
    const res = await fetch(`http://localhost:5000/api/workout/editworkout/${id}`,{
      method:"PUT",
        headers:{
              "Content-Type": "application/json",
             "auth-token": localStorage.getItem("token"),
             },
             body:JSON.stringify(edit)
    })
    const json = await res.json()
  handleClose();
  fetchworkout()

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
         <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
                      <TextField
                        label="Search"
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        variant="filled"
                      />
                    </Box>
        <Button size="small" href="/workout" style={{color:"#000"}}><Edit/> Add Workout</Button>
        <Button size="small"  style={{color:"#000"}}><Download onClick={exportcsv} />Generate Report</Button>
        <Grid container spacing={3}>
          {searchfilter.length === 0 ? (
                  <Grid item xs={12} style={{display:"flex",justifyContent:"center",Padding:40,color:"#000"}}>
                    <h3>No Data Found</h3>
                  </Grid>
          

          ):(
            searchfilter.map((item) => {
            const isactive = activeworkout === item._id && running;
            const isdone = activeworkout === item._id && !running && sets >= item.sets;
            return(

              <Grid container item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ width: 500,display:"flex",flexDirection:"column" }} >

                  <CardContent>
                    <Typography gutterBottom variant="h5" mb={2} fontWeight="bold" style={{color:"#000"}} component="div">
                      {item.exercisesname}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      >
                      <b>Category: </b>{item.category}
                    </Typography>
                    <div style={{display:"flex",justifyContent:"start",gap:20}}>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      >
                      <b>Sets: </b>{item.sets} | <b>Reps: </b>{item.reps}
                    </Typography>
                        </div>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      >
                      {item.notes}
                    </Typography>
                      {isactive && (
                        <div style={{display:"flex",justifyContent:"start",gap:20}}>

                    <Typography
                      variant="h6"
                      sx={{ color: "black" }}
                      >
                        Sets:{sets + 1} / {item.sets}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "black" }}
                      >
                        Reps:{reps + 1} / {item.reps}
                    </Typography>
                        </div>
                      )}
                      {isdone && (
                          <Typography variant="h6" color="success.main" mt={2}>
                        ✅ Workout Complete!
                      </Typography>
                      )}
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => startworkout(item._id)} disabled={running}>Start</Button>
                    <Button size="small" onClick={() => HandleChangeValue(item)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => DeleteHandle(item._id)}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
        </Grid>
                    )
})
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
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField label="Exercise Name" name="exercisesname" value={edit.exercisesname} onChange={HandleChange} variant="filled" />
                    <TextField label="Sets" name="sets" type="number" value={edit.sets} onChange={HandleChange} variant="filled" />
                    <TextField label="Reps" name="reps" type="number" value={edit.reps} onChange={HandleChange} variant="filled" />
                    <TextField label="Weight (kg)" name="weight" type="number" value={edit.weight} onChange={HandleChange} variant="filled" />
                    <TextField label="Notes" name="notes" value={edit.notes} onChange={HandleChange} variant="filled" />
                    <TextField
                      name="category"
                      select
                      SelectProps={{ native: true }}
                      value={edit.category}
                      onChange={HandleChange}
                      variant="filled"
                    >
                      <option value="">Select Category</option>
                      <option value="strength">Strength</option>
                      <option value="cardio">Cardio</option>
                      <option value="flexibility">Flexibility</option>
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

export default Workoutlist;
