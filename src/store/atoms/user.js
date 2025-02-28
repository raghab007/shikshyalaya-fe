import { atom } from "recoil";
console.log("Hello")
const userRecoilState = atom({
    key: "userState",
    default: localStorage.getItem("token") ? true : false,

});


export default userRecoilState;






