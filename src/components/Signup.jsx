import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { account } from '../appwrite/appwriteConfig'
import { login } from '../store/authSlice'
import { Loader as Spinner } from './index'

function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const signupUser = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await account.create(
        uuidv4(),
        user.email,
        user.password,
        user.name
      );
      if (response) {
        const session = await account.createEmailPasswordSession(user.email, user.password)
        if (session) {
          const userData = await account.get()
          dispatch(login({ userData }));
          setLoading(false);
          console.log(response);
          navigate('/profile');
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log("Signup.jsx :: signupUser() :: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center content-center justify-center w-full h-screen dark:bg-purple-700 bg-gray-200 px-2">
      <div className="sm:w-1/2 w-full h-auto bg-white dark:bg-purple-900 rounded-md flex flex-col content-center items-center justify-between px-20 dark:border dark:border-gray-300 border-none">
        <form method='POST' className='py-20 w-full'>
          <p className="text-center text-3xl text-black dark:text-white mb-3">Sign up</p>
          <p className="text-center mb-3 text-black dark:text-white text-xl">Already have an account? <Link className="hover:text-blue-400 hover:underline transition-all duration-200" to={'/'}>Login</Link></p>
          <p className="text-sm text-red-400 text-center">
            {error ? error : ''}
          </p>
          <p className="text-sm text-red-400 text-center">
            {loading ? <Spinner /> : ''}
          </p>
          <label htmlFor="name" className="text-sm font-medium text-black dark:text-white mb-3">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            // autoComplete='current-name'
            placeholder='Enter your name'
            required
            className='appearance-none rounded-md mb-5 block w-full px-3 py-2'
            onChange={(e) => {
              setUser({
                ...user, name: e.target.value
              })
            }}
          />
          <label htmlFor="email" className="text-sm font-medium text-black dark:text-white mb-3">
            E-mail Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            // autoComplete='current-email'
            placeholder='Enter E-mail Address'
            required
            className='appearance-none rounded-md mb-5 block w-full px-3 py-2'
            onChange={(e) => {
              setUser({
                ...user, email: e.target.value
              })
            }}
          />
          <label htmlFor="password" className="text-sm font-medium text-black dark:text-white mb-3">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            // autoComplete='current-password'
            placeholder='Enter Password'
            required
            className='appearance-none rounded-md mb-5 block w-full px-3 py-2'
            onChange={(e) => {
              setUser({
                ...user, password: e.target.value
              })
            }}
          />
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-400 text-white dark:bg-green-400 w-full px-2 py-2 rounded-sm mt-3"
            onClick={signupUser}
          >Signup</button>
        </form>
      </div>
    </div>
  )
}

export default Signup