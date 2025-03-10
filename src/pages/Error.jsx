import { useNavigate } from "react-router-dom";

function ErrorPage(){

    const navigate = useNavigate();
    navigate("/")
    return (
        <>
        <div style={{background:"white", color:"red",}}>    
            <h1 style={{marginTop:"300px",marginBottom:"300px",marginLeft:"520px",fontSize:"40px",fontWeight:"600"}}>Sorry, Page not found</h1>
        </div>
        </>
    )
}


export default ErrorPage;