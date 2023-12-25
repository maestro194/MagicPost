import React, {useState	} from "react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/slice/userSlice";
import { useSelector } from "react-redux";

export default function Signin() {
  const [formData, setFormData] = useState({});
	const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
	const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      if (data.type === "General Manager") navigate("/gm");
      else if (data.type === "Warehouse Manager") navigate("/wm");
      else if (data.type === "Warehouse Employee") navigate("/we");
      else if (data.type === "Office Manager") navigate("/om");
      else if (data.type === "Office Employee") navigate("/oe");
      else navigate("/");						// change this later to specific page for each type of user
      console.log(data)
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-8">Sign in</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
					onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
					onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover: opacity-95 disabled:opacity-80"
        >
        {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
			{error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
