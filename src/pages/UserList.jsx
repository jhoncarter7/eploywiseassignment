import axios from "axios";
import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import Button from "../components/Button";
import { toast } from "react-toastify";
import FormModel from "../components/FormModel";
import { useId } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState();
  const [openModel, setOpenModel] = useState();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useMemo(() => {
    const fetchUser = async () => {
      const userlist = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      if (userlist.data.data.length <= 0) {
        return;
      }
      setUserList(userlist.data.data);
    };
    fetchUser();
  }, [page]);
  console.log(userList);

  const deleteUserHandler = async (userId) => {
    try {
      const res = await axios.delete(`https://reqres.in/api/users/${userId}`);
      console.log("del", res);
      toast.success("User Deleted", res);
      const newList = userList.filter((x) => x.id !== userId);
      setUserList(newList);
    } catch (error) {
      toast.error(error);
    }
  };

  const toggelModel = (userId) => {
    setOpenModel(!openModel);
    console.log("useId", useId);
    setUserId(userId);
  };

  return (
    <section className="pt-12 relative ">
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
                <Button
                  text="Edit"
                  customCss={" text-green-400"}
                  onClick={() => toggelModel(id)}
                />
                <Button
                  text="Delete"
                  customCss={" text-red-400"}
                  onClick={() => deleteUserHandler(id)}
                />
              </div>
            </div>
          ))}
      </div>

      {openModel && <FormModel userId={userId} toggelModel={toggelModel} />}

      <div className="w-full mx-auto flex justify-center py-12">
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
      </div>
    </section>
  );
};

export default UserList;
