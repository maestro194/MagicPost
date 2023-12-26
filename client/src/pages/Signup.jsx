import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData(
			{
				...formData,
				[e.target.id]: e.target.value,
			}
		);
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			}
			);
			const data = await res.json();
			console.log(data)
			if(data.success === false) {
				setError(data.message);
				setLoading(false);
				return;
			}
			setLoading(false);
			setError(null);
			navigate('/signin')
			// console.log(data)
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	}

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-8">Sign up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
		    <input
          type="text"
          placeholder="Full Name"
          className="border p-3 rounded-lg"
          id="fullname"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Account Type"
          className="border p-3 rounded-lg"
          id="type"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Account Type"
          className="border p-3 rounded-lg"
          id="officeCode"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover: opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign up'}
        </button>
      </form>
			{/* update this later */}
			{error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
