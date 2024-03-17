import React from "react";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
const Add = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    study: "",
    phonenumber: null,
  });
  const changeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/add", data);
      //console.log(data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="h-screen bg-gradient-to-r to-blue-400 from-green-300">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-5 justify-center items-center"
        >
          <h2 className="ml-6 font-extrabold text-center text-xl">
            Add Student
          </h2>
          <div className="flex gap-5">
            <label className=" font-semibold">Name</label>
            <input
              onChange={changeHandler}
              className="border-2 rounded-md"
              type="text"
              placeholder="Enter name"
              name="name"
            />
          </div>
          <div className="flex gap-5 ">
            <label className=" font-semibold">Email</label>
            <input
              onChange={changeHandler}
              className="border-2 rounded-md"
              type="text"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="flex gap-5">
            <label className=" font-semibold">Study</label>
            <input
              onChange={changeHandler}
              className="border-2 rounded-md"
              type="text"
              placeholder="Enter study"
              name="study"
            />
          </div>
          <div className="flex gap-5 ">
            <label className=" font-semibold">Phone</label>
            <input
              onChange={changeHandler}
              className="border-2 rounded-md"
              type="number"
              placeholder="Enter PhoneNumber"
              name="phonenumber"
            />
          </div>
          <div className=" text-white">
            <button className="ml-8 mr-2 bg-gradient-to-br from-cyan-400  to-indigo-900 rounded-md mt-4 px-3 py-[0.25rem]">
              <NavLink to="/">Back</NavLink>
            </button>
            <button className="ml-2 bg-gradient-to-r from-violet-400 to-orange-100 font-extrabold px-3 rounded-md py-[0.25rem]">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
