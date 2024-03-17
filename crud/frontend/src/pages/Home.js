import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchallstudents = async () => {
      try {
        const res = await axios.get("http://localhost:8080/");
        console.log(res.data);
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchallstudents();
  }, [students]);
  const deleteHandler = async (id) => {
    try {
      await axios.delete("http://localhost:8080/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" bg-gray-500 h-screen">
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col w-1/2 rounded-lg bg-white gap-2">
          <h2 className=" text-center font-extrabold text-xl">Students List</h2>
          <table className=" table table-auto border-separate border-spacing-2 border-slate-100">
            <tbody>
              <tr className="">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Study</th>
                <th>PhoneNo</th>
                <th>Action</th>
              </tr>
              {students.map((student) => (
                <tr key={student.id} className="">
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.study}</td>
                  <td>{student.phonenumber}</td>
                  <td>
                    <button className="mx-1 px-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
                      <NavLink to={`view/${student.id}`}>View</NavLink>
                    </button>
                    <button className=" mx-1 px-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg text-white">
                      <NavLink to={`edit/${student.id}`}>Edit</NavLink>
                    </button>
                    <button
                      onClick={() => deleteHandler(student.id)}
                      className="mx-1 px-3 bg-gradient-to-r from-purple-500 to-sky-500 rounded-lg text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button className="text-white m-2 px-3 bg-gradient-to-r from-teal-400 to-pink-400 rounded-md">
              <NavLink to="/add">Add Student</NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
