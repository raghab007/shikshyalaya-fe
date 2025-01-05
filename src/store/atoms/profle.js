// import axios from "axios";
import { atom, useRecoilState } from "recoil";
// const token = localStorage.getItem("token");

// async function getData() {
//     const response = await axios.get("http://localhost:8085/user", {
//         headers: {
//             Authorization: `Bearer ${token}`,

//         }
//     });
//     const data = response;
//     return data;
// }
const userProfileState = atom({
    key: "userProfileState",
    default: {
        userName: null,
        email: null,
        firstName: null,
        lastName: null,
        contactNumber: null
    }
})


// async function getUserProfile() {
//     const data = await getData();
//     console.log(data);
// }
// //await getUserProfile();


export default userProfileState;