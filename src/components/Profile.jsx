import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { account } from '../appwrite/appwriteConfig';
import { TodoForm, Todos } from '../components/index';

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const user = await account.get();
        setUserDetails( user )
      } catch (error) {
        console.log("Profile.jsx :: getUserDetails :: ", error);
      }
    };
    getUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await account.deleteSession("current");
      if (res) navigate("/");
      console.log("Profile.jsx :: handleLogout() res :: ", res);
    } catch (error) {
      console.log("Profile.jsx :: handleLogout :: ", error);
    }
  };

  function toCamelCase(str) {
    return str
      .split(/[\s]+/)
      .map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }

  return (
    <>
      {userDetails ? (
        <div className="w-full min-h-screen max-h-fit bg-gray-200 dark:bg-purple-700 relative">
          <div className="fixed top-0 w-full px-2 py-7 flex flex-row justify-between items-center bg-gray-300 dark:bg-purple-600 h-[2rem]">
            <div className="flex flex-row items-center justify-between content-center">
              <span className="text-black dark:text-white text-lg">
                <strong>Hello</strong> {toCamelCase(userDetails.name)}
              </span>
            </div>
            <div className="logo text-black dark:text-white">logo</div>
            <button className="p-2 text-center bg-red-500 text-white text-md" onClick={handleLogout}>Logout</button>
          </div>
          {/* TodoForm */}
          <TodoForm />
          {/* Todos */}
          <Todos />
        </div>
      ) : (
        <div className="w-full h-screen bg-gray-200 dark:bg-purple-700 text-black dark:text-white flex flex-col content-center justify-center">
          <div className="flex flex-col px-2 py-3 rounded-lg shadow text-2xl font-bold content-center items-center justify-between gap-10">
            <Link to={'/'}>
              <p className="hover:text-blue-400 duration-200 text-sm inline-block">
                Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
