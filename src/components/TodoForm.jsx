import { Permission, Role } from 'appwrite'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { account, databases } from '../appwrite/appwriteConfig'
import conf from '../conf/conf'
import { Loader as Spinner } from './index'

function TodoForm({ setTodos }) {
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(0)
  const d = new Date()

  const handleSubmit = async (e) => {
    setLoading(1)
    e.preventDefault();
    if (!todo.trim()) {
      alert("Todo cannot be Empty!")
      setLoading(0)
      return
    }

    try {
      const user = await account.get();
      const userId = user.$id;
      const documentId = uuidv4();
      const date = JSON.stringify({
        year : d.getFullYear(),
        month : d.getMonth() + 1,
        day : d.getDate() + 1,
        hour : d.getHours(),
        minutes : d.getMinutes(),
      })

      const res = await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        {
          todo,
          userId,
          date,
        },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );
      res ? setLoading(0) : 0;
      setTodos((prevTodos) => [...prevTodos, res]);
      console.log(res);
      setTodo('');
    } catch (error) {
      console.log("TodoForm.jsx :: handleSubmit() :: ", error);
    }

    e.target.reset();
  };
  return (
    <>
      {
        loading ? (
          <div className="mt-[2rem] pt-10 flex justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <div className="mt-[2rem] pt-10 flex justify-center w-full">
            <form onSubmit={handleSubmit} className="sm:w-2/3 w-full flex flex-row items-center justify-even content-center">
              <input
                type="text"
                name=""
                id=""
                placeholder='Enter a todo...'
                className='border shadow p-2 sm:w-2/3 w-[80%] rounded-md m-2 sm:m-5'
                onChange={(e) => setTodo(e.target.value)}
              />
              <div className="flex flex-row content-center items-center justify-around gap-2">
                <p className="dark:text-white text-gray-500">Add</p>
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-purple-500 text-white m-2 w-[40px] h-[40px] rounded-[20px] hover:bg-purple-200 transition-all duration-200 hover:text-black active:bg-purple-900 font-[3rem]">
                  +
                </button>
              </div>
            </form>
          </div>
        )
      }
    </>
  )
}
export default TodoForm;