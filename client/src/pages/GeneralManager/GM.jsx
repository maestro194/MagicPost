import React, { useState } from "react";
import { FaHome, FaUser, FaCube, FaBuilding } from "react-icons/fa";
import Profile from "./components/Profile";
import Users from "./components/Users";
import Packages from "./components/Packages";
import Offices from "./components/Offices";
import {
  fetchUsersStart,
  fetchUsersFailure,
  fetchUsersSuccess,
  fetchPackagesFailure,
  fetchPackagesStart,
  fetchPackagesSuccess,
  fetchOfficesFailure,
  fetchOfficesStart,
  fetchOfficesSuccess,
} from "../../redux/slice/gmSlice";
import { useDispatch } from "react-redux";

export default function GM() {
  const [state, setState] = useState("profile");
  const [users, setUsers] = useState([{
    id: 1,
    username: "test",
    email: "test@test.com", 
    type: "General Manager",
    name: "Test",
    officeCode: 1,
  }]);
  const [packages, setPackages] = useState([]);
  const [offices, setOffices] = useState([]);
  const dispatch = useDispatch();

  // console.log(users);

  const handleClick = (selected) => {
    console.log(selected);
    setState(selected);
    handleData(selected);
  };

  const handleData = async (selected) => {
    if (selected === "profile") {
      console.log("profile!");
    } else if (selected === "users") {
      try {
        dispatch(fetchUsersStart());
        const res = await fetch("/api/gm/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        // console.log(data);
        if (data.success === false) {
          dispatch(fetchUsersFailure(data.message));
          return;
        }
        setUsers(data);
        dispatch(fetchUsersSuccess(data));
      } catch (error) {
        dispatch(fetchUsersFailure(error.message));
      }
    } else if (selected === "packages") {
      try {
        dispatch(fetchPackagesStart());
        const res = await fetch("/api/gm/packages", {
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
    } else if (selected === "offices") {
      try {
        dispatch(fetchOfficesStart())
        const res = await fetch("/api/gm/offices", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        // console.log(data);
        if (data.success === false) {
          dispatch(fetchOfficesFailure(data.message));
          return;
        }
        setOffices(data);
        dispatch(fetchOfficesSuccess(data));
      } catch (error) {
        dispatch(fetchOfficesFailure(error.message));
      }
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
              onClick={() => handleClick("users")}
            >
              <FaUser className="m-1" />
              <span className="hidden md:inline-flex">User</span>
            </li>
            <li
              className="flex gap-3 w-full h-12 py-3 pl-4 hover:bg-slate-300"
              onClick={() => handleClick("packages")}
            >
              <FaCube className="m-1" />
              <span className="hidden md:inline-flex">Package</span>
            </li>
            <li
              className="flex gap-3 w-full h-12 py-3 pl-4 hover:bg-slate-300"
              onClick={() => handleClick("offices")}
            >
              <FaBuilding className="m-1" />
              <span className="hidden md:inline-flex">Offices</span>
            </li>
          </ul>
        </div>

        {/* right content */}
        <div className="p-6 gap-4 w-full h-4/5">
          <div className="">
            {state === "profile" ? (
              <Profile />
            ) : state === "users" ? (
              <Users
                users={users.users}
              />
            ) : state === "packages" ? (
              <Packages 
                packages={packages.packages}
              />
            ) : state === "offices" ? (
              <Offices
                offices={offices.offices}
              />
            ) :(
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
