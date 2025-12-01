import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

function Login({settoken,setrole}) {
  const [data, setdata] = useState({ email: "", password: "" });
  const [password,setpassword] = useState(false);
  let navigate = useNavigate();
   const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const json = await res.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        localStorage.setItem("role", json.role) ;
        localStorage.setItem("id", json.id);
        settoken(json.authtoken)
        setrole(json.role);

        if (json.role?.toLowerCase() === "admin") {
          navigate("/admindashboard");    
        } else if (json.role?.toLowerCase() === "user") {
          navigate("/dashboard");
        }
        alert("Login Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  return(
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
                         <li class="has-sub">
                          <a href="/#contact">Contact</a>
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
        background:"#121527",
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
        style={{ width: isMobile ? "150%" : "50%" ,}}
      >
        <h2 className="text-center" style={{ color: "#fff" }}>
          Login Your Account
        </h2>
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              mt: 2,
              width: { xs: "120%", sm: "100%", md: "80%", lg: "80%" },
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={HandleSubmit}
        >
          <TextField
            id="email"
            name="email"
            value={data.email}
            onChange={HandleChange}
            label="Email"
            variant="filled"
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
          <TextField
            id="password"
            name="password"
            value={data.password}
            onChange={HandleChange}
            label="Password"
            variant="filled"
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
  }}
          />
          <Button
            variant="contained"
            type="submit"
            style={{ background: "#fff",color:"#472fa3",fontWeight:"bold" }}
          >
            Login
          </Button><br></br><br></br>
            <a style={{color:"#fff"}}>have an account <Link to="/register">?Register</Link></a>
          
        </Box>
      </div>
    </div>
            </>
  )
}

export default Login;
