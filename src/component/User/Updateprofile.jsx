import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useThemeColor } from "../Context/Themecolor";

function Updateprofile({ empid }) {
  const [data, setdata] = useState([]);
  const {bgcolor,usercolor,textcolor,usertextcolor} = useThemeColor()
  const [edit, setedit] = useState({
    firstname: "",
    lastname: "",
    email: "",
    image: null,
  });

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/auth/getuser/${empid}`,
          {
            method: "GET",
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        const json = await res.json();
        setdata(json );
        setedit(json || {
          firstname: "",    
          lastname: "",
          email: "",
          image: null,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchuser();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("firstname", edit.firstname);
    formdata.append("lastname", edit.lastname);
    formdata.append("email", edit.email);
    if (edit.image) {
      formdata.append("image", edit.image);
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/profileupdate/${empid}`,
        {
          method: "PUT",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
          body: formdata,
        }
      );
      const json = await res.json();
      setdata(json);
      alert("Profile Updated!!");
      setedit({
        firstname: "",
        lastname: "",
        email: "",
        image: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const HandleChange = (e) => {
    if (e.target.name === "image") {
      setedit({ ...edit, image: e.target.files[0] });
    } else {
      setedit({ ...edit, [e.target.name]: e.target.value });
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" mb={2} fontWeight="bold" style={{color:"#000"}}>
          Profile
        </Typography>

        <Box
          component="form"
          onSubmit={HandleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="First Name"
            name="firstname"
            value={edit.firstname}
            onChange={HandleChange}
            variant="filled"
          />
          <TextField
            label="Last Name"
            name="lastname"
            value={edit.lastname}
            onChange={HandleChange}
            variant="filled"
          />
          <TextField
            label="Email"
            name="email"
            value={edit.email}
            onChange={HandleChange}
            variant="filled"
          />
          <TextField
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={HandleChange}
            variant="outlined"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "left",
            }}
          >
            <img
              src={`http://localhost:5000/upload/${data.image}`}
              alt="profile"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50px",
                objectFit: "cover",
              }}
            />
          </div>
          <Button type="submit" variant="contained" sx={{ bgcolor:bgcolor,color:textcolor }}>
            Update Profile
          </Button>
           <Box
          sx={{ display: "flex", flexDirection: "row", gap: 2 }}
        >
           <label style={{fontSize:"17px",color:"#000"}}>Background Color</label>
          <input type="color" id="color" name="color"
           defaultValue={bgcolor} onChange={(e) => {usercolor(e.target.value)}}></input>
           <label style={{fontSize:"17px",color:"#000"}}>Text Color</label>
          <input type="color" id="color" name="color"
           defaultValue={textcolor} onChange={(e) => {usertextcolor(e.target.value)}}></input>
        </Box>
        </Box>  
      </Paper>
    </Box>
  );
}

export default Updateprofile;
