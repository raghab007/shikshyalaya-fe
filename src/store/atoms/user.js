import { atom } from "recoil";
console.log("Hello")
const userState = atom({
    key: "userState",
    default: localStorage.getItem("token") ? true : false,

});

export default userState;






