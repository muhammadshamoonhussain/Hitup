import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { useThemeColor } from "./Context/Themecolor";



const drawerWidth = 220;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: "all 0.3s ease",
    marginLeft: open ? drawerWidth : 0, // 👈 shift content smoothly
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: "all 0.3s ease",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));



const userPages = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Your Workout", path: "/workoutlist" },
  { name: "Your Nutrition", path: "/nutritionlist" },
  { name: "Go Website", path: "/" },
];

const adminPages = [
  { name: "Admin Home", path: "/admindashboard" },
  { name: "User List", path: "/alluser" },
  { name: "Workout List", path: "/allworkoutlist" },
  { name: "Nutrition List", path: "/allnutritionlist" },
  { name: "Contact List", path: "/contactlist" },
  
];

const settings = ["Profile", "Logout"];

export default function Sidebar({ children, settoken, setrole, role,token ,empid}) {

  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 
  const [data,setdata] = useState([]);
  const [notifi,setnotifi] = useState([]);
  const [anchorElNoti, setAnchorElNoti] = useState(null);
  const handleOpenNotifications = (event) => setAnchorElNoti(event.currentTarget);
const handleCloseNotifications = () => setAnchorElNoti(null);
  
  const menuitem = role === "admin" ? adminPages : userPages;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
    const {bgcolor,usercolor,textcolor,usertextcolor} = useThemeColor()
  
  
  const logout = () => {
    localStorage.removeItem("token");
    settoken(null);
    setrole(null);
    navigate("/login");
  };

  useEffect(()=>{
    fetchuser();
    fetchnotification();
  },[empid])
  const fetchuser = async () => {
        if (!empid || !token) return;

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
        setdata(json || {});
      } catch (error) {
        console.log(error);
      }
    };


    const fetchnotification = async () =>{
      try {
        const res = await fetch(`http://localhost:5000/api/notification/getnotify/${empid}`,{
           method: "GET",
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
        })
        const json = await res.json();
        setnotifi(json)
      } catch (error) {
        console.log(error);
        
      }
    }
  
  if(!token){
    return null;
  }


  return (  
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open && !isMobile}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" , bgcolor: bgcolor }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{ color:textcolor }} />
            </IconButton>
            <Typography variant="h6" noWrap component="div" style={{fontSize:isMobile ? '15px' : '25px',color:textcolor }}>
              <img src="img/logo/w_logo.png" alt="logo" />
            </Typography>
          </Box>
            <Box sx={{ flexGrow: 0,flexDirection:"row",display:'flex',gap:"10px" }}>
    <Badge badgeContent={notifi.filter(n => !n.isRead).length} color="error">
      <MailIcon color="action" onClick={handleOpenNotifications} style={{cursor:"pointer"}} />
      <Menu
  sx={{ mt: "45px" }}
  anchorEl={anchorElNoti}
  open={Boolean(anchorElNoti)}
  onClose={handleCloseNotifications}
>
  {notifi.length === 0 ? (
    <MenuItem>No notifications</MenuItem>
  ) : (
    notifi.map((n) => (
      <MenuItem
        key={n._id}
        onClick={async () => {
          await fetch(`http://localhost:5000/api/notification/readnotifi/${n._id}`, {
            method: "PATCH",
          });
          setnotifi((prev) =>
            prev.map((item) =>
              item._id === n._id ? { ...item, isRead: true } : item
            )
          );
        }}
      >
        {n.message}
      </MenuItem>
    ))
  )}
</Menu>

    </Badge>
             <Typography vari ant="h6" noWrap component="div" style={{fontSize:isMobile ? '10px' : '15px',color:textcolor }}>
              {data.firstname}
            </Typography>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <img
                src={`http://localhost:5000/upload/${data.image}`}
                alt="user"
                width="35"
                height="35"
                style={{ borderRadius: "50%" }}
                />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
              {settings.map((setting) => (
                <MenuItem
                key={setting}
                onClick={() => {
                  handleCloseUserMenu();
                  if (setting === "Logout") logout();
                  if (setting === "Profile") navigate("/profile");
                }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
           
          </Box>
        </Toolbar>
      </AppBar>

      
      <MuiDrawer
        variant={isMobile ? "temporary" : "persistent"} 
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
             bgcolor: bgcolor, 
            color:textcolor ,
          },
        }}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ color:textcolor }}>Menu</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon sx={{ color:textcolor }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuitem.map((item) => (
            <ListItem key={item.name} disablePadding> 
              <ListItemButton sx={{ color:textcolor }}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setOpen(false); 
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </MuiDrawer>

      {/* ====== Page Content ====== */}
      <Main open={open && !isMobile}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
