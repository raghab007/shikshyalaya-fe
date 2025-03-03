import { atom } from "recoil";

const userRecoilState = atom({
    key: "userState",
    default: localStorage.getItem("token") ? true : false,

});


export default userRecoilState;






