import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async () => {

    try {

      const response = await axios.post(

        "https://full-stack-project-7236.onrender.com/login",

        {
          email,
          password
        }

      );

      console.log(response.data);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
         JSON.stringify(response.data.user)
       );

       navigate("/dashboard");

      alert("Login Successful");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  return (

    <div className="h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

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

        <button
          className="w-full bg-black text-white p-3 rounded"
          onClick={loginUser}
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an account?
          <span
            className="text-blue-500 cursor-pointer ml-1"
            onClick={() => navigate("/")}
          >
            Signup
          </span>
        </p>

      </div>

    </div>

  );

}

export default Login;