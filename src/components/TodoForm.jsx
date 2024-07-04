import { Permission, Role } from 'appwrite'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { account, databases } from '../appwrite/appwriteConfig'
import conf from '../conf/conf'

function TodoForm() {
  const [todo, setTodo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await account.get();
      const userId = user.$id;
      const documentId = uuidv4();

      const res = await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        {
          todo,
          userId,  // Store userId in the document
        },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );

      console.log(res);
      setTodo('');  // Reset the state
    } catch (error) {
      console.log("TodoForm.jsx :: handleSubmit() :: ", error);
    }

    e.target.reset();  // Reset the form
  };
  return (
    <div className="mt-[2rem] pt-10 flex justify-center w-full">
      <form onSubmit={handleSubmit} className="sm:w-2/3 w-full">
        <input
          type="text"
          name=""
          id=""
          placeholder='Enter a todo...'
          className='border shadow p-2 sm:w-2/3 w-[80%] rounded-md m-2 sm:m-5'
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="bg-purple-500 text-white mt-2 w-[40px] h-[40px] rounded-[20px] hover:bg-purple-200 transition-all duration-200 hover:text-black active:bg-purple-900 font-[3rem]"> + </button>
      </form>
    </div>
  )
}

export default TodoForm