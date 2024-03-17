import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";
const Edit = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    study: "",
    phonenumber: "",
  });
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:8080/view/" + id);
        setData({
          ...data,
          name: res.data[0].name,
          email: res.data[0].email,
          study: res.data[0].study,
          phonenumber: res.data[0].phonenumber,
        });
        // console.log(res.data[0]);
      } catch (e) {}
    };
    fetchdata();
  }, [data]);

  const changeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      axios.put(`http://localhost:8080/edit/${id}`, data);
      //   window.location.reload();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="h-screen bg-gradient-to-r to-blue-400 from-green-300">
        <form
          onSubmit={updateHandler}
          className="flex flex-col gap-5 justify-center items-center"
        >
          <h2 className=" ml-6 font-extrabold text-center text-xl">
            Update Student
          </h2>
          <div className="flex gap-5">
            <label className=" font-semibold">Name</label>
            <input
              onChange={changeHandler}
              className="border-2 rounded-md"
              type="text"
              placeholder="Enter name"
              name="name"
              value={data.name}
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
              value={data.email}
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
              value={data.study}
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
              value={data.phonenumber}
            />
          </div>
          <div className=" text-white">
            <button className="ml-8 mr-2 bg-gradient-to-br from-cyan-400  to-indigo-900 rounded-md mt-4 px-3 py-[0.25rem]">
              <NavLink to="/">Back</NavLink>
            </button>
            <button className="ml-2 bg-gradient-to-r from-violet-400 to-orange-100 font-extrabold px-3 rounded-md py-[0.25rem]">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
