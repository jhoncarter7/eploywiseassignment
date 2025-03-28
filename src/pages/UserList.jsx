import axios from "axios";
import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import Button from "../components/Button";
import { toast } from "react-toastify";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  //   const [userId, setUserId] =useState()
  useMemo(() => {
    const fetchUser = async () => {
      const userlist = await axios.get(`https://reqres.in/api/users?page=1`);
      if (userlist.data.data.length <= 0) {
        return;
      }
      setUserList(userlist.data.data);
    };
    fetchUser();
  }, []);
  console.log(userList);

  
  const deleteUserHandler = async (userId) => {
    try {
      const res = await axios.delete(`https://reqres.in/api/users/${userId}`);
      console.log("del", res)
      toast.success("User Deleted", res);
      const newList = userList.filter(x => x.id !== userId)
      setUserList(newList)
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <section className="pt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 mx-auto ">
        {userList &&
          userList?.map(({ id, first_name, last_name, avatar }) => (
            <div
              key={id}
              className="flex flex-col w-44 sm:w-full h-64 sm:h-fit mx-auto gap-y-2 shadow-md p-4 rounded-lg"
            >
              <div className="flex gap-x-1 mx-auto">
                <p>{first_name}</p>
                <p>{last_name}</p>
              </div>
              <img
                src={avatar}
                alt=""
                className="object-fill text-green-400 rounded-md"
              />
              <div className="flex justify-between">
                <Button text="Edit" customCss={" text-green-400"} />
                <Button
                  text="Delete"
                  customCss={" text-red-400"}
                  onClick={()=> deleteUserHandler(id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UserList;
