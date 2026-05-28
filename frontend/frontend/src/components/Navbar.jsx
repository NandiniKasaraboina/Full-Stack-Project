import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logoutUser = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div className="bg-black text-white px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

      <h1 className="text-2xl font-bold">
        MERN App
      </h1>

      <div className="flex flex-wrap gap-4">

        <Link to="/">
          Login
        </Link>

        <Link to="/signup">
          Signup
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <button onClick={logoutUser}>
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;