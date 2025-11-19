import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './component/Sidebar';
import Register from './component/Register';
import Login from './component/Login';
import ProtectedRoutes from './component/ProtectedRoutes';
import AdminHome from './component/Admin/AdminHome';
import UserHome from './component/User/UserHome';
import Addworkout from './component/User/Addworkout';
import Workoutlist from './component/User/Workoutlist';
import Addnutrition from './component/User/Addnutrition';
import NutritionList from './component/User/NutritionList';
import Updateprofile from './component/User/Updateprofile';
import Alluser from './component/Admin/Alluser';
import AllWorkoutlist from './component/Admin/AllWorkoutlist';
import Allnutrition from './component/Admin/Allnutrition';
import Front from './component/Front';
import ContactList from './component/Admin/ContactList';
import Themecolor from './component/Context/Themecolor';
import PublicRoute from './component/PublicRoute';

function App() {
  const [token, settoken] = useState(localStorage.getItem("token"));
  const [role, setrole] = useState(localStorage.getItem("role"));

  return (
    <Themecolor>

    <Router>
      <AppContent token={token} role={role} settoken={settoken} setrole={setrole} />
    </Router>
    </Themecolor>
  );
}

// Ye Router ke andar hai, isliye useLocation kaam karega
function AppContent({ token, role, settoken, setrole }) {
  const location = useLocation();
  const hideSidebar = location.pathname === "/";

  return (
    <>
      {!hideSidebar && (
        <Sidebar
          settoken={settoken}
          token={token}
          setrole={setrole}
          role={role}
          empid={localStorage.getItem("id")}
        />
      )}

      <Routes>
        <Route path='/' element={<Front empid={localStorage.getItem("id")} />} />
        <Route path='/login' element={<PublicRoute><Login settoken={settoken} setrole={setrole} /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/admindashboard' element={<ProtectedRoutes allowrole={"admin"}><AdminHome /></ProtectedRoutes>} />
        <Route path='/alluser' element={<ProtectedRoutes allowrole={"admin"}><Alluser /></ProtectedRoutes>} />
        <Route path='/allworkoutlist' element={<ProtectedRoutes allowrole={"admin"}><AllWorkoutlist /></ProtectedRoutes>} />
        <Route path='/allnutritionlist' element={<ProtectedRoutes allowrole={"admin"}><Allnutrition /></ProtectedRoutes>} />
        <Route path='/contactlist' element={<ProtectedRoutes allowrole={"admin"}><ContactList /></ProtectedRoutes>} />
        <Route path='/dashboard' element={<ProtectedRoutes allowrole={"user"}><UserHome empid={localStorage.getItem("id")} /></ProtectedRoutes>} />
        <Route path='/workout' element={<ProtectedRoutes allowrole={"user"}><Addworkout /></ProtectedRoutes>} />
        <Route path='/workoutlist' element={<ProtectedRoutes allowrole={"user"}><Workoutlist empid={localStorage.getItem("id")} /></ProtectedRoutes>} />
        <Route path='/nutrition' element={<ProtectedRoutes allowrole={"user"}><Addnutrition /></ProtectedRoutes>} />
        <Route path='/nutritionlist' element={<ProtectedRoutes allowrole={"user"}><NutritionList empid={localStorage.getItem("id")} /></ProtectedRoutes>} />
        <Route path='/profile' element={<ProtectedRoutes allowrole={["user","admin"]}><Updateprofile empid={localStorage.getItem("id")} /></ProtectedRoutes>} />
      </Routes>
    </>
  );
}

export default App;
