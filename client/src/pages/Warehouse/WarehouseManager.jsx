import React, { useState } from 'react'
import { FaHome, FaUser, FaCube, FaBuilding, FaExchangeAlt } from "react-icons/fa";
import Profile from "./components/Profile";
import Users from "./components/Users";
import Transactions from "./components/Transactions";

import {
  fetchUsersStart,
  fetchUsersFailure,
  fetchUsersSuccess,
} from "../../redux/slice/wmSlice";

import {
  fetchTransactionsStart, fetchTransactionsSuccess, fetchTransactionsFailure,
} from "../../redux/slice/transactionSlice";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function WarehouseManager() {
  const { currentUser } = useSelector((state) => state.user);
  const [state, setState] = useState("profile");
  const [users, setUsers] = useState([{
    id: 1,
    username: "test",
    email: "test@test.com", 
    type: "General Manager",
    name: "Test",
  }]);
  const [transactions, setTransactions] = useState([{ id: 1, packageId: 1, fromLocation: "", toLocation: "", status: "",}]);
  const dispatch = useDispatch();

  const handleClick = (selected) => {
    console.log(selected);
    setState(selected);
    handleData(selected);
  };

  const handleData = async (selected) => {
    if (selected === "profile") {
      console.log("profile!");
    } else if (selected === "users") {
      console.log(currentUser)
      try {
        dispatch(fetchUsersStart());
        const res = await fetch(`/api/wm/users/${currentUser.officeCode}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          dispatch(fetchUsersFailure(data.message));
          return;
        }
        setUsers(data);
        dispatch(fetchUsersSuccess(data));
      } catch (error) {
        dispatch(fetchUsersFailure(error.message));
      }
    } else if (selected === "transactions") {
      try {
        dispatch(fetchTransactionsStart());
        const res = await fetch(`/api/transaction/fromtransactions/${currentUser.officeCode}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          dispatch(fetchTransactionsFailure(data.message));
          return;
        }
        const res2 = await fetch(`/api/transaction/totransactions/${currentUser.officeCode}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data2 = await res2.json();
        console.log(data2);
        if (data2.success === false) {
          dispatch(fetchTransactionsFailure(data2.message));
          return;
        }

        data.transactions = data.transactions.concat(data2.transactions);

        setTransactions(data);
        dispatch(fetchTransactionsSuccess(data));
      }
      catch (error) {
        dispatch(fetchTransactionsFailure(error.message));
      }
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
              onClick={() => handleClick("users")}
            >
              <FaUser className="m-1" />
              <span className="hidden md:inline-flex">User</span>
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
            ) : state === "users" ? (
              <Users
                users={users.users}
              />
            ) : state === "transactions" ? (
              <Transactions
                transactions={transactions.transactions}
              />
            ) :( 
              <div></div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}
