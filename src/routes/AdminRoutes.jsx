import { Route, Routes } from "react-router-dom";

export default function AdminRoutes(){
    
    return <>
    <Routes>
        <Route path="/admin/users" element={<Users></Users>}></Route>
        <Route path="/admin/courses" element={<Courses></Courses>}></Route>
    </Routes>
    </>
}

function Courses(){
    return( <div>
        {/* <h1>Courses</h1> */}
    </div>
    )
}



function Users(){
    return(
        <div>
            {/* <h1>Users</h1> */}
        </div>
    )
}