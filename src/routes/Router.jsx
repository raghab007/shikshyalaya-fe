import { useRecoilState } from "recoil";
import UserRoutes from "./UserRoutes";
import InstructorRoutes from "./InstructorRoutes";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userProfileSelector } from "../store/atoms/profle";
import AdminRoutes from "./AdminRoutes";

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
  } else if (userState?.role === "ADMIN") {
    return <AdminRoutes />;
  }

  return null; // fallback if no role matches
}

export default Router;
