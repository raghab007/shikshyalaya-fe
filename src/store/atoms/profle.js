import axios from "axios";
import { atom, selector, useRecoilState } from "recoil";

const userProfileState = atom({
    key: "userProfileState",
    default: {
        userName: null,
        email: null,
        firstName: null,
        lastName: null,
        contactNumber: null,
        role:null
        //role:"USER"
    }
})


const userProfileSelector = selector({
    key:"userProfileSelector",
    get:async ({get})=>{
        try {
            const response = await axios.get("http://localhost:8085/user",{
                headers:{
                    Authorization:"token"+localStorage.getItem("token")
                }
            })
        }catch(error){
            console.log("Error fetching data ");
            return get(userProfileState) // Return the  default state if the backend call fails
        }
    }
    
})




export  {userProfileState,userProfileSelector};