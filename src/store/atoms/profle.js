import axios from "axios";
import { atom, useRecoilState } from "recoil";

const userProfileState = atom({
    key: "userProfileState",
    default: {
        userName: null,
        email: null,
        firstName: null,
        lastName: null,
        contactNumber: null,
        //role:"INSTRUCTOR"
        role:"USER"
    }
})


export default userProfileState;