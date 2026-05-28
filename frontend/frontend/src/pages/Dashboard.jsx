import Navbar from "../components/Navbar";

import axios from "axios";

import { useEffect, useState } from "react";

function Dashboard() {

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [updatedName, setUpdatedName] = useState("");

  const [updatedRole, setUpdatedRole] = useState("");

  const fetchUsers = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/users"
      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  const deleteUser = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/users/${id}`
      );

      fetchUsers();

    } catch (error) {

      console.log(error);

    }

  };

  const openUpdateModal = (user) => {

    setSelectedUser(user);

    setUpdatedName(user.name);

    setUpdatedRole(user.role);

    setShowModal(true);

  };

  const saveUpdatedUser = async () => {

    try {

      await axios.put(

        `http://localhost:5000/users/${selectedUser._id}`,

        {
          name: updatedName,
          role: updatedRole
        }

      );

      setShowModal(false);

      fetchUsers();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      <Navbar />

      <div className="p-6 md:p-10">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <button
            className="bg-black text-white px-5 py-2 rounded"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

        <input
          type="text"
          placeholder="Search Users..."
          className={`border p-3 rounded mb-6 w-full md:w-96 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white"
          }`}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid gap-4">

          {users

            .filter((user) =>
              user.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )

            .map((user) => (

              <div
                key={user._id}
                className={`p-5 rounded-lg shadow ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-white"
                }`}
              >

                <h2 className="text-xl font-bold">
                  {user.name}
                </h2>

                <p className="mt-2">
                  {user.email}
                </p>

                <p className="mb-4">
                  {user.role}
                </p>

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-3"
                  onClick={() => openUpdateModal(user)}
                >
                  Update
                </button>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>

              </div>

          ))}

        </div>

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">

            <h2 className="text-2xl font-bold mb-4">
              Update User
            </h2>

            <input
              type="text"
              className="border p-3 rounded w-full mb-4"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />

            <input
              type="text"
              className="border p-3 rounded w-full mb-4"
              value={updatedRole}
              onChange={(e) => setUpdatedRole(e.target.value)}
            />

            <div className="flex justify-end gap-3">

              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={saveUpdatedUser}
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default Dashboard;