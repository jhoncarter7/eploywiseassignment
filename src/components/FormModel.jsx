import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from './Button';

const FormModel = ({ userId,  toggelModel}) => {
//   const [user, setUser] = useState(null);

  const [formValues, setFormValues] = useState({
    email: '',
    first_name: '',
    last_name: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${userId}`);
        const fetchedUser = response.data.data;
        // setUser(fetchedUser);
       
        setFormValues({
          email: fetchedUser.email || '',
          first_name: fetchedUser.first_name || '',
          last_name: fetchedUser.last_name || ''
        });
      } catch (error) {
        toast.error('Failed to fetch user', error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const updateUserHandler = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.put(`https://reqres.in/api/users/${userId}`, formValues);
      console.log("Update response:", res.data);
      toast.success("User update success");
      
    } catch (error) {
      console.error("Update error:", error);
      toast.error("User update failed");
    }
  };

  return (
    <div className=" inset-0  h-screen bg-gray-400 opacity-80 fixed top-0 left-0 flex items-center justify-center">
      <div className='bg-white rounded-lg  opacity-100  blur-none'>
        <div className='flex justify-end items-end p-4 cursor-pointer' onClick={()=> toggelModel()}>X</div>
        <form
          onSubmit={updateUserHandler}
          className="flex flex-col gap-5 justify-center items-center my-auto p-12"
        >
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="border-[1px] rounded-md p-2 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="First name"
            name="first_name"
            value={formValues.first_name}
            onChange={handleChange}
            className="border-[1px] rounded-md p-2 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="last_name"
            value={formValues.last_name}
            onChange={handleChange}
            className="border-[1px] rounded-md p-2 focus:outline-none"
            required
          />
          <Button type="submit" text="Update" />
        </form>
      </div>
    </div>
  );
};

export default FormModel;
