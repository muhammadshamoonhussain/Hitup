import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';

function AdminHome() {
  const [data,setdata] = useState([])
  const [workout,setworkout] = useState([])
  const [nutrition,setnutrition] = useState([])
  const [contact,setcontact] = useState([])

   useEffect(() => {
      fetchuser();
      fetchworkout();
      fetchnutrition();
      fetchcontact();
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
    const fetchworkout = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/workout/allworkout", {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        const json = await res.json();
        setworkout(json);
      } catch (error) {
        console.log(error);
      }
    };
   const fetchnutrition = async () => {
              try {
                const res = await fetch("http://localhost:5000/api/nutrition/getallnutrition", {
                  method: "GET",
                  headers: {
                    "auth-token": localStorage.getItem("token"),
                  },
                });
                const json = await res.json()
                setnutrition(json)
              } catch (error) {
                console.log(error);
                
              }
            };
   const fetchcontact = async () => {
              try {
                const res = await fetch("http://localhost:5000/api/contact/getcontact", {
                  method: "GET",
                  headers: {
                    "auth-token": localStorage.getItem("token"),
                  },
                });
                const json = await res.json()
                setcontact(json)
              } catch (error) {
                console.log(error);
                
              }
            };
    
          
  return (
             <div className='d-flex flex-column'>
    <div className='d-flex flex-wrap justify-content-center gap-4  '>
    <Card sx={{ width: '20%'   }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Total User
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Totals: {data.length}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
     <Card sx={{ width: '20%'  }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Total Workouts
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           Total: {workout.length}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
     <Card sx={{width: '20%'  }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Total Nutritions
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Total: {nutrition.length}
            
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
     <Card sx={{ width: '20%'  }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Total Contacts
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           Total: {contact.length} 
                     </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
    </div>
  )
}

export default AdminHome
