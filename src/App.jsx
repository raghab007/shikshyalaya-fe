
//import Course from "./pages/Course";
import Router from "./routes/Router";

function App() {
 

  
  return (
    <>
    {/* {!isAdmin && !isInstructor && <Navbar />}
    
      {isAdmin && <AdminRoutes />}
      {isInstructor && <InstructorRoutes />}
      {!isAdmin && !isInstructor && <UserRoutes />}
    {!isAdmin && !isInstructor && <Footer />} */}
    <Router></Router>
  </>
  )  
}


export default App;







