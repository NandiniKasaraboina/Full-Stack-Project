import Navbar from "../components/Navbar";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center items-center mt-10 px-4">

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

          <div className="flex flex-col items-center">

            <div className="w-24 h-24 bg-black text-white rounded-full flex justify-center items-center text-3xl font-bold mb-4">

              {user.name.charAt(0).toUpperCase()}

            </div>

            <h1 className="text-3xl font-bold mb-2">
              {user.name}
            </h1>

            <p className="text-gray-600 mb-6">
              {user.email}
            </p>

          </div>

          <div className="space-y-4">

            <div className="bg-gray-100 p-4 rounded">

              <h2 className="font-bold">
                Role
              </h2>

              <p>
                {user.role}
              </p>

            </div>

            <div className="bg-gray-100 p-4 rounded">

              <h2 className="font-bold">
                Status
              </h2>

              <p>
                Active User
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;