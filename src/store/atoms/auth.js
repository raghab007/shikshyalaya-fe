import { selector } from "recoil";
import userState from "./user";

const authState = selector({
    key: "authState",
    get: ({ get }) => {
        const user = get(userState);
        return user.token == null ? false : true;
    }
});

export default authState;
