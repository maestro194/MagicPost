import React, { useState } from 'react'
import { FaHome, FaUser, FaCube } from 'react-icons/fa'
import Profile from "./components/Profile";
import Packages from "./components/Packages";

import {

} from "../../redux/slice/weSlice";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function WarehouseEmployee() {
  const { currentUser } = useSelector((state) => state.user);
  const [state, setState] = useState("profile");

  const handleClick = (selected) => {
    console.log(selected);
    setState(selected);
    handleData(selected);
  };

  const handleData = async (selected) => {
    if (selected === "profile") {
      console.log("profile!");
    } else {
      console.log("other!");
    }
  };

  return (
    <div>
      {/* left navi */}
      <div className="flex">
        <div className="bg-white w-16 md:w-64 h-screen overflow-hidden border">
          <div>
            <h1 className="font-bold text-sm sm:text-xl flex w-full justify-center my-6">
              <span className="text-slate-500">Magic Post</span>
            </h1>
          </div>
          <ul className="gap-4">
            <li
              className="flex gap-3 w-full h-12 py-3 pl-4 hover:bg-slate-300"
              onClick={() => handleClick("profile")}
            >
              <FaHome className="m-1" />
              <span className="hidden md:inline-flex">Home</span>
            </li>
            <li
              className="flex gap-3 w-full h-12 py-3 pl-4 hover:bg-slate-300"
              onClick={() => handleClick("packages")}
            >
              <FaCube className="m-1" />
              <span className="hidden md:inline-flex">Package</span>
            </li>
          </ul>
        </div>
        {/* right content */}
        <div className="p-6 gap-4 w-full h-4/5">
          <div className="">
            { state === "profile" ? (
              <Profile />
            ) : state === "packages" ? (
              <Packages />
            ) :( 
              <div></div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}
