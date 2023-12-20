import React from "react";
import {FaSearch} from "react-icons/fa";

export default function Search() {
  return (
    <div className="flex justify-center">
      <form className="bg-slate-100 p-3 rounded-lg flex items-center">
        <input
          type="text"
          placeholder="Your delivery number..."
          className="bg-transparent focus:outline-none"
        />
        <FaSearch className='text-slate-600'/>
      </form>
    </div>
  );
}
