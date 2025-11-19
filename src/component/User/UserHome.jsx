import React, { use, useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts';
import Swal from "sweetalert2"; // for popup




function UserHome({ empid }) {
  const [data, setdata] = useState([])
  const [slider,setslider] = useState(0)
  const [nutrition,setnutrition] = useState([])

  useEffect(() => {
    fetchworkout();
    fetchneutrition();
    checkWorkout();

    const interval = setInterval(checkWorkout, 60000);
   return () => clearInterval(interval) 
  }, [empid]); 

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
      setdata(json.slice( 0, 4));
    } catch (error) {
      console.log(error);
    }
  };

   const fetchneutrition = async () => {
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
      setnutrition(json.slice( 0, 4));
    } catch (error) {
      console.log(error);
    }
  };

const get7days = () =>{
  const day = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i)
    day.push(d.toLocaleDateString())
    
  }
  return day;
}

const [last7days,setlast7days] = useState(get7days());


const barChartsParams = {
  xAxis: [{ 
    data: last7days,
    label:"Workout Dates"
  }],
  series: [
    { 
      data: data.map(w => w.reps),
       label: 'Reps Done', 
      color: '#3f51b5' 
    },
  ],
   margin: { top: 20, right: 10 },
    height: 400,
    hideLegend: false,
};


const checkWorkout = async () =>{
  if(!empid) return
  try {
    const res = await fetch(`http://localhost:5000/api/workout/checkworkout/${empid}`,{
      method:"GET",
        headers: {
            "auth-token": localStorage.getItem("token"),
          },

    })    
    const json = await res.json()
     console.log("Workout today:", json.donetoday);
    if(!json.donetoday){
 Swal.fire({
          title: "Hey!",
          text: "You haven't done your workout today! 💪",
          icon: "warning",
          confirmButtonText: "OK",
        });
    }
  } catch (error) {
    console.log(error);
  }
} 

  return (
    
    <div className='d-flex flex-column'>
      <Typography>Today Workout</Typography>
      <div className='d-flex justify-content-center gap-4 flex-row'>
        {data.map((data)=> (
          <>
    <Card sx={{ width: '20%'   }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.exercisesname}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <div key={data._id} style={{height:80,width:80}}>

             <CircularProgressbar
             key={data.exercisesname}
              value={data.progress || 0}
              text={`${data.progress || 0}%`}
              styles={buildStyles({
                textColor: "#000",
                pathColor: data.completed ? "green" : "#3f51b5",
                trailColor: "#d6d6d6",
              })}
              />
              </div>
          
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
          </>
  ))}
    </div>

      
    <div className='d-flex flex-wrap justify-content-center gap-4 '>

     <Stack direction="column" sx={{ width: '100%', maxWidth: 500 }}>
      <BarChart {...barChartsParams} slotProps={{ tooltip: { trigger: 'axis' } }} />
    </Stack>
  {/* <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      height={300}
    /> */}
 <LineChart
 xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
   series={[
    {
      data: nutrition.map(n => n.calories),
      label: "Calories",
      color: "orange",
      curve: "monotoneX",
      point: { visible: true, size: 6 }, 
    },
    ]}
  height={300}
/>

    </div>
    </div>
  );
}

export default UserHome;
