import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "./config";


// this will store the username of loggedIn user, across pages




export const callProfileAtom = atom({
    key: "callProfileAtom",
    default: selector({ // atoms cannot have async function as their default value so we use selector to fetch data from server
        key: "profile",
        get: async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/user/profile`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`},
                  })
                  return res;
            } catch (error) {
                return {status : 403, data:{}}
            }
        }
    })
});


export const userInfoSelector = selector({
    key: "userInfoSelector",
    get: ({get}) => {
        const res = get(callProfileAtom);
        if(res.status === 200){
            return res?.data.user.username;
        }else{
            return "";
        }
    }
})
export const userIdSelector = selector({
    key: "userIdSelector",
    get: ({get}) => {
        const res = get(callProfileAtom);
        if(res.status === 200){
            return res?.data.user.id;
        }else{
            return -999;
        }
    }
})

export const verifiedSelector = selector({
    key: "verifiedSelector",
    get: ({get}) => {

        const res = get(callProfileAtom);
        if(res.status === 200){
            return true;
        }else{
            return false;
        }
    }
})







export const userInfoAtom = atom({
    key: 'userInfoAtom',
    default: userInfoSelector,
  });

export const verifiedAtom = atom({
    key: 'verifiedAtom',
    default: verifiedSelector,
  });

export const userIdAtom = atom({
    key: 'userIdAtom',
    default: userIdSelector,
  });


