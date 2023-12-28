import React, { useState } from 'react'
import { FaHome, FaUser, FaCube, FaExchangeAlt } from 'react-icons/fa'
import Profile from "./components/Profile";
import Packages from "./components/Packages";
import Transactions from "./components/Transactions";

import {
  fetchPackagesStart, fetchPackagesSuccess, fetchPackagesFailure,
} from "../../redux/slice/oeSlice";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function WarehouseEmployee() {
  const { currentUser } = useSelector((state) => state.user);
  const [officeCode, setOfficeCode] = useState({
    currentOffice: (currentUser.officeCode),
  });
  const [state, setState] = useState("profile");
  const [packages, setPackages] = useState([{packageId: 1, sender: "test", fromLocation: "", receiver: "", toLocation: "", packageType: "", totalValue: "", weight: "", deliveredDate: "", shippingCost: "", cashOnDelivery: "", receivedDate: "", notes: "", deliveryStatus: "",}]);

  const dispatch = useDispatch();

  const handleClick = (selected) => {
    // console.log(selected);
    setState(selected);
    handleData(selected);
  };

  const handleData = async (selected) => {
    if (selected === "profile") {
      // console.log("profile!");
    } else if (selected === "packages") {
      console.log("packages!");
      try {
        dispatch(fetchPackagesStart());
        const res = await fetch(`/api/oe/packages/${currentUser.officeCode}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          dispatch(fetchPackagesFailure(data.message));
          return;
        }
        setPackages(data);
        dispatch(fetchPackagesSuccess(data));
      } catch (error) {
        dispatch(fetchPackagesFailure(error.message));
      }
    } else if (selected === "transactions") {
      // console.log("transactions!");
    } else {
      console.log("other!");
    }
  };

  return (
    <div>
      {/* left navi */}
      <div className="flex">
        <div className="bg-white w-16 md:w-64 h-screen border">
          <div>
            <h1 className="font-bold text-sm md:text-xl flex w-full justify-center my-6">
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
              <span className="hidden md:inline-flex">Packages</span>
            </li>
            <li
              className="flex gap-3 w-full h-12 py-3 pl-4 hover:bg-slate-300"
              onClick={() => handleClick("transactions")}
            >
              <FaExchangeAlt className="m-1" />
              <span className="hidden md:inline-flex">Transactions</span>
            </li>
          </ul>
        </div>

        {/* right content */}
        <div className="p-6 gap-4 w-full h-4/5">
          <div className="">
            { state === "profile" ? (
              <Profile />
            ) : state === "packages" ? (
              <Packages 
                packages={packages.packages}
              />
            ) : state === "transactions" ? (
              <Transactions />
            ) :( 
              <div></div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}
