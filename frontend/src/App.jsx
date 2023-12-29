import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from "./dashboard/pages/SignIn";
import SignUp from "./dashboard/pages/SignUp";
import About from "./dashboard/pages/About";
import HeaderDash from "./componets/HeaderDash";

function App() {
  return ( 
   <BrowserRouter>
   <HeaderDash/>
   <Routes>

<  Route path="/dashboard/signin" element={<SignIn/>} />
<  Route path="/dashboard/signup" element={<SignUp/>} />
<  Route path="/dashboard/about" element={<About/>} />

   </Routes>
   </BrowserRouter>
   );
}

export default App;