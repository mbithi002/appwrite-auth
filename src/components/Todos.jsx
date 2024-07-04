import { Query } from 'appwrite';
import React, { useEffect, useState } from 'react';
import { account, databases } from '../appwrite/appwriteConfig';
import conf from '../conf/conf';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      setLoader(true);
      try {
        const user = await account.get();
        const res = await databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          [Query.equal('userId', user.$id)]
        );
        console.log(res);
        setTodos(res.documents);
      } catch (error) {
        console.log("Todos.jsx :: getTodos() :: ", error);
      } finally {
        setLoader(false);
      }
    };

    getTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const res = await databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, id);
      console.log(res);
      setTodos((prevTodos) => prevTodos.filter(todo => todo.$id !== id));
    } catch (error) {
      console.log("Todos.jsx :: deleteTodo() :: ", error);
    }
  };
  return (
    <div className="w-full p-5 mx-auto">
      <p className="text-center font-bold mb-3 text-2xl text-black dark:text-white">Todo List</p>
      {loader ? (
        <p className="animate-bounce text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {todos.map((todo) => (
            <div key={todo.$id} className="bg-gray-400 text-white dark:text-black dark:bg-gray-200 p-4 rounded-lg shadow-lg min-h-[160px]">
              <h3 className="text-lg font-semibold mb-2">{todo.todo}</h3>
              {/* <p className="mb-4 text-gray-600">Some additional details about the todo can go here.</p> */}
              <button
                onClick={() => {
                  deleteTodo(todo.$id)
                }}
                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition-all duration-200 bottom-0">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

  );
}

export default Todos;
