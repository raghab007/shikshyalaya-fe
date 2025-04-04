import { useRecoilState } from "recoil";
import UserRoutes from "./UserRoutes";
import InstructorRoutes from "./InstructorRoutes";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userProfileSelector } from "../store/atoms/profle";

function Router() {
    const [userState, setUserState] = useRecoilState(userProfileSelector);

    if (userState?.role === "USER" || userState?.role == null) {
        return (
            <>
                <Navbar />
                <UserRoutes />
                <Footer />
            </>
        );
    } else if (userState?.role === "INSTRUCTOR") {
        return <InstructorRoutes />;
    }

    // Optionally, you can return a fallback if none of the conditions are met
    return null; // Or a default fallback JSX
}

export default Router;
