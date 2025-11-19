import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


function Register() {
  let navigate = useNavigate();
  const [password,setpassword] = useState(false);
  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    image: null,
    gender: "",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  const HandleSubmit = async (e) => {
     e.preventDefault();
    const formdata = new FormData();
    formdata.append("firstname", data.firstname);
    formdata.append("lastname", data.lastname);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("gender", data.gender);
    if (data.image) {
      formdata.append("image", data.image);
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formdata,
      });
      const json = await res.json();
      alert("Register Successfully");
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleChange = (e) => {
    if (e.target.name == "image") {
      setdata({ ...data, image: e.target.files[0] });
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };

 
  return (
    <>
    <div class="home-2">
    <header class="header-area">
        <div id="header-sticky" class="menu-area menu-area2">
          <div class="container">
            <div class="second-menu">
              <div class="row align-items-center">
                <div class="col-xl-2 col-lg-2">
                  <div class="logo2">
                    <a href="/">
                      <img src="img/logo/w_logo.png" alt="logo" />
                    </a>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6">
                  <div class="main-menu text-right pr-15">
                    <nav id="mobile-menu">
                      <ul>
                        <li class="has-sub">
                          <a href="/">Home</a>
                        </li>
                        <li>
                          <a href="/#about">About Us</a>
                        </li>
                        <li class="has-sub">
                          <a href="/#services">Services</a>
                        </li>

                        <li class="has-sub">
                          <a href="/#blog">Blog</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-4 d-none d-lg-block">
                  <div class="right-menu">
                    <ul>
                      <li>
                        <a href="/login" class="top-btn">
                         Login 
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mobile-menu"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      </div>
   <div
      className="d-flex flex-row mb-0"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:"#121527"
      }}
    >
      {!isMobile && (
        <div
          className="container w-50"
          style={{
            background: "#121527",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            height: "95vh",
            borderRadius: 18,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "rgb(0 0 0 / 35%) 2px 0px 2px 2px;",
          }}
        >
          <img
            src="https://fitnexus-delta.vercel.app/assets/welcome-BTBXXI9V.png"
            alt=""
            className="img-fluid"
            style={{ objectFit: "cover", height: "80%" }}
          />
        </div>
      )}
      <div
        className="container text-center w-50"
        style={{ width: isMobile ? "150%" : "50%" }}
      >

      
              <Box component="form" sx={{ "& > :not(style)": {m: 1, width: { xs: "120%", sm: "100%", md: "80%", lg: "80%" }},}}
                noValidate
                autoComplete="on"
                >
                  
               <TextField id="firstname" name="firstname" label="First Name" variant="filled"
                 value={data.firstname}
                 onChange={HandleChange}
                  sx={{input: { color: 'white' } ,fieldset: { borderColor: 'white' } ,
      "&:active fieldset": { 
      borderColor: 'white' 
    } ,
     "&:hover": {
        backgroundColor: "#2a2a3a",
      },
      "&.Mui-focused": {
        backgroundColor: "#1c1c2b",
      },
      "&:before": {
        borderBottom: "2px solid #fff", // underline default
      },
      "&:after": {
        borderBottom: "2px solid #472fa3", // underline focus
      },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#472fa3",
    },
            }}
                />
                <TextField id="lastname" name="lastname" label="Last Name" variant="filled" 
                value={data.lastname} onChange={HandleChange} 
                 sx={{input: { color: 'white' } ,fieldset: { borderColor: 'white' } ,
      "&:active fieldset": { 
      borderColor: 'white' 
    } ,
     "&:hover": {
        backgroundColor: "#2a2a3a",
      },
      "&.Mui-focused": {
        backgroundColor: "#1c1c2b",
      },
      "&:before": {
        borderBottom: "2px solid #fff", // underline default
      },
      "&:after": {
        borderBottom: "2px solid #472fa3", // underline focus
      },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#472fa3",
    },
            }}/>
                <TextField id="email" name="email" label="Email" variant="filled"
                 value={data.email} onChange={HandleChange}
                  sx={{input: { color: 'white' } ,fieldset: { borderColor: 'white' } ,
      "&:active fieldset": { 
      borderColor: 'white' 
    } ,
     "&:hover": {
        backgroundColor: "#2a2a3a",
      },
      "&.Mui-focused": {
        backgroundColor: "#1c1c2b",
      },
      "&:before": {
        borderBottom: "2px solid #fff", // underline default
      },
      "&:after": {
        borderBottom: "2px solid #472fa3", // underline focus
      },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#472fa3",
    },
            }}/>

                <TextField id="password" name="password" label="Password" variant="filled"
                 value={data.password} onChange={HandleChange} 
                 type={password ? "text" : "password"}
                 InputProps={{
                  endAdornment:(
                    <InputAdornment position="end">
                      <IconButton onClick={() => setpassword(!password)} edge="end">
                        {password ? <VisibilityOff style={{color:"#fff"}}/> : <Visibility style={{color:"#fff"}}/>}
                      </IconButton>
                    </InputAdornment>
                  )
                 }}
                  sx={{input: { color: 'white' } ,fieldset: { borderColor: 'white' } ,
      "&:active fieldset": { 
      borderColor: 'white' 
    } ,
     "&:hover": {
        backgroundColor: "#2a2a3a",
      },
      "&.Mui-focused": {
        backgroundColor: "#1c1c2b",
      },
      "&:before": {
        borderBottom: "2px solid #fff", // underline default
      },
      "&:after": {
        borderBottom: "2px solid #472fa3", // underline focus
      },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#472fa3",
    },
            }}/>
                <TextField id="image" name="image" type="file" accept="image/*" 
                onChange={HandleChange} variant="outlined"
                 sx={{input: { color: 'white' } ,fieldset: { borderColor: 'white' } ,
      "&:active fieldset": { 
      borderColor: 'white' 
    } ,
     "&:hover": {
        backgroundColor: "#2a2a3a",
      },
      "&.Mui-focused": {
        backgroundColor: "#1c1c2b",
      },
      "&:before": {
        borderBottom: "2px solid #fff", // underline default
      },
      "&:after": {
        borderBottom: "2px solid #472fa3", // underline focus
      },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#472fa3",
    },
            }}/>


                      <TextField id="gender" name="gender" select value={data.gender} onChange={HandleChange}
          SelectProps={{
            native: true,
          }}
           variant="outlined" // outlined variant se border control hota hai
  sx={{
    color: "white", // text color
    "& .MuiOutlinedInput-root": {
      color: "white", // selected text
      "& fieldset": {
        borderColor: "white", // default border
      },
      "&:hover fieldset": {
        borderColor: "#fff", // hover border
      },
      "&.Mui-focused fieldset": {
        borderColor: "#472fa3", // focused border
      },
      backgroundColor: "#1c1c2b", // default background
    },
    "& .MuiInputLabel-root": {
      color: "#fff", // label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#472fa3", // focused label
    },
  }}
          >

          <option value="" style={{color:"black",background:"#462fa363"}}>Select Gender</option>
          <option value="Male" style={{color:"black",background:"#462fa363"}}>Male</option>
          <option value="Female" style={{color:"black",background:"#462fa363"}}>Female</option>
        </TextField>

                <Button variant="contained" onClick={HandleSubmit}   style={{ background: "#fff",color:"#472fa3",fontWeight:"bold" }} type="submit">Register</Button><br></br>
                  <a  style={{color:"#fff"}}>have an account <Link to="/login">?Login</Link></a>
            </Box>
                </div>
    </div>
    </>
  );
}

export default Register;
