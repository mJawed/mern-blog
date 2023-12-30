import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SignIn from "./dashboard/pages/SignIn";
import SignUp from "./dashboard/pages/SignUp";
import About from "./dashboard/pages/About";
import HeaderDash from "./componets/HeaderDash";
import Dashboard from './dashboard/pages/Dashboard';



function App() {


  return ( 
   <BrowserRouter>
   <Routes>

        {/* Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            <>
              <HeaderDash />
              <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="signin/" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="about" element={<About />} />
              </Routes>
            </>
          }
        />

             {/* Frontend Routes */}
             <Route
          path="/*"
          element={
            <Routes>
        
            </Routes>
          }
        />

   </Routes>
   </BrowserRouter>
   );
}

export default App;