import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";

//import Course from "./pages/Course";
import Footer from './components/Footer'
import Navbar from "./components/Navbar";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import { RecoilRoot } from "recoil";

function App() {
  // hook to get the current location of the page...
  const location = useLocation()
  const isAdmin = location.pathname.startsWith("/admin");
  const isInstructor = location.pathname.startsWith("/instructor");
  console.log("somthing")
  console.log(isInstructor)
  console.log(location)
  

  return (
    <>
    {!isAdmin && !isInstructor && <Navbar />}
    
      {isAdmin && <AdminRoutes />}
      {isInstructor && <InstructorRoutes />}
      {!isAdmin && !isInstructor && <UserRoutes />}
    {!isAdmin && !isInstructor && <Footer />}
  </>
  )  
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  );
}







