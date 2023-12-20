import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* top */}
      <div className="flex flex-row p-10 pt-32">
        <div className="flex flex-col gap-6 p-12 px-3 max-w-2xl mx-auto">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl mx-auto">
            Package delivered to
            <br />
            <span>your front door</span>
          </h1>
          <button className="bg-blue-500 w-2/5 p-3 hover:bg-blue-300 rounded-lg">
            <Link
              to={"/search"}
              className="text-lg sm:text-md text-white font-bold"
            >
              Track your package...
            </Link>
          </button>
        </div>
        <div className="max-h-md max-w-md mx-auto">
          <img
            src="https://www.shutterstock.com/image-vector/food-delivery-man-riding-red-600nw-1327144634.jpg"
            alt="delivery-image"
          />
        </div>
      </div>
    </div>
  );
}
