import { useRecoilState } from "recoil";
import UserRoutes from "./UserRoutes";
import InstructorRoutes from "./InstructorRoutes";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userProfileSelector } from "../store/atoms/profle";

function Router (){
    const [userState, setUserState] = useRecoilState(userProfileSelector);

    if(userState.role=="USER" || userState.role==null){
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