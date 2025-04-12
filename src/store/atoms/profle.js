import axios from "axios";
import { atom, selector } from "recoil";

const userProfileState = atom({
  key: "userProfileState",
  default:null
});

const userProfileSelector = selector({
  key: "userProfileS",
  get: async ({ get }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return get(userProfileState); // Return default state if no token
      }

      const response = await axios.get("http://localhost:8085/user", {


        
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

      return response.data;
    } catch (error) {
      localStorage.setItem("token", null);
      console.error("Error fetching user profile:", error.response?.data || error.message);
      return get(userProfileState); // Return default state if request fails
    }
  },
});


export { userProfileState, userProfileSelector };
