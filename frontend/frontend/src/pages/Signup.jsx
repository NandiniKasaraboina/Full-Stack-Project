import axios from "axios";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");

  const registerUser = async () => {

    try {

      const response = await axios.post(

        "http://localhost:5000/users",

        {
          name,
          email,
          password,
          role
        }

      );

      console.log(response.data);

      alert("Signup Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Signup Failed");

    }

  };

  return (

    <div className="h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Role"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setRole(e.target.value)}
        />

        <button
          className="w-full bg-black text-white p-3 rounded"
          onClick={registerUser}
        >
          Signup
        </button>

      </div>

    </div>

  );

}

export default Signup;