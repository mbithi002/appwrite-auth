import { Query } from 'appwrite';
import React, { useEffect, useState } from 'react';
import { account, databases } from '../appwrite/appwriteConfig';
import conf from '../conf/conf';
import { Loader as Spinner } from './index';

function Todos({ todos, setTodos }) {
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState({})

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
  }, [setTodos]);

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
      <p className="text-center font-bold mb-3 text-2xl text-black dark:text-white">Todo List <i class="fa-solid fa-list text-xl"></i></p>
      {loader ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {todos.map((todo) => {
            const parsedDate = todo.date ? JSON.parse(todo.date) : null;
            return (
              <div
                key={todo.$id}
                className="pt-5 pr-5 pl-5 pb-1 relative flex flex-col justify-between bg-gray-400 text-white dark:text-black dark:bg-gray-200 p-4 rounded-lg shadow-lg min-h-[160px]"
              >
                <h3 className="text-lg mb-2">{todo.todo}</h3>
                <div className="flex flex-row justify-between items-center content-center">
                  <button
                    onClick={() => deleteTodo(todo.$id)}
                    className="self-start bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition-all duration-200"
                  >
                    Delete <i className="fa-solid fa-trash text-[1rem] ml-2"></i>
                  </button>
                  <p className=" flex flex-row">
                    <i class="fa-solid fa-clock mr-1 self-center"></i>
                    {parsedDate ? (
                      <span className="text-[.9rem] text-white dark:text-gray-700 font-semibold flex flex-row justify-start items-center content-center">{parsedDate.day}/{parsedDate.month}/{parsedDate.year} <span className="inline-block text-[12px] text-gray-200 dark:text-black p-1 border border-gray-200 dark:border-green-500 rounded-md ml-1">{parsedDate.hour < 10 ? ("0" + parsedDate.hour) : parsedDate.hour}:{parsedDate.minutes < 10 ? ("0" + parsedDate.minutes) : (parsedDate.minutes)} {parsedDate.hour >= 12 ? "PM" : "AM"}</span> </span>
                    ) : (
                      <div className="text-[.9rem] text-green-500 font-semibold inline-block">no date</div>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      )}
    </div>

  );
}

export default Todos;
