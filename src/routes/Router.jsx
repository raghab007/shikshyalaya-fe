import { useRecoilState } from "recoil";
import userProfileState from "../store/atoms/profle";
import UserRoutes from "./UserRoutes";
import InstructorRoutes from "./InstructorRoutes";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Router (){
    const [userState, setUserState] = useRecoilState(userProfileState);

    if(userState.role=="USER"){
        return (
            <><Navbar></Navbar>
            <UserRoutes></UserRoutes>
            <Footer></Footer></>  
        )
    }else if (userState.role=="INSTRUCTOR"){
        return (
        <InstructorRoutes></InstructorRoutes>
        )
    }

}


export default Router;