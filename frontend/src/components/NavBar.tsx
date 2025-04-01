import { PiPenNibStraightBold } from "react-icons/pi";
import { GiNotebook } from "react-icons/gi";
import { FiUserPlus } from "react-icons/fi";
import { LiaSignInAltSolid } from "react-icons/lia";
import { ImBooks } from "react-icons/im";


import { Link } from "react-router-dom";
import DropD from "./DropD";
// import { useEffect } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../config";
import {  useRecoilValue } from "recoil";
import { userInfoAtom, verifiedAtom } from "../atom";




function NavBar() {
    const username = useRecoilValue(userInfoAtom);
    const verified = useRecoilValue(verifiedAtom);

  return (
    <div className="flex items-center justify-between w-full h-[8vh] border border-b sm:px-20 px-5">

        {/* logo */}
        <Link to={"/"} className="flex gap-1 items-center">
            <div className="text-lg text-gray-800">
                <PiPenNibStraightBold />
            </div>
            <span className="text-lg font-bold">Jotter</span>
        </Link>

        {/* personal */}
        {verified && 
        <div className="hidden sm:flex gap-8">
            <Link to={"/myjotters"}  className=" flex items-center gap-2 text-[13.5px] text-gray-700 font-medium bg-gray-200 px-[13px] py-1 rounded-full tracking-wide">
                My Jotters <span className="text-[18px]"><ImBooks /></span>
            </Link>
            <Link to={`/write`} className=" flex items-center gap-1">
                <span className="text-[15px] text-gray-700 font-semibold">Write</span>
                <GiNotebook />
            </Link>
        </div>
        }

        {/* dropdown */}
        {verified ?
            (<div>
                <div className="flex sm:hidden">
                    <DropD label={username || "Unknown"} items={["Write", "My blogs", "Sign out"]} />
                </div>
                <div className="sm:flex hidden">
                    <DropD label={username || "Unknown"} items={["Sign out"]} />
                </div>
            </div>)
            :
            <div className="flex items-center gap-10">
                <Link to={`/signup`} className=" flex items-center gap-2">
                    <span className="text-[15px] text-gray-700 font-semibold">Join now</span>
                    <FiUserPlus />
                </Link>
                <Link to={`/signin`} className=" flex items-center gap-1">
                    <span className="text-[15px] text-gray-700 font-semibold">Sign in</span>
                    <div className="text-[19.5px]">
                    <LiaSignInAltSolid />
                    </div>
                </Link>
            </div>
            
        }
        

    </div>
  )
}

export default NavBar