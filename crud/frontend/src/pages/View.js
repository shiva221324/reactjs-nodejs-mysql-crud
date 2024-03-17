import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
const View = () => {
  const { id } = useParams();
  console.log(id);
  let [student, setStudent] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:8080/view/" + id);
        setStudent(res.data);
        console.log(res.data);
      } catch (e) {}
    };
    fetchdata();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-slate-500 h-screen">
      <div className=" flex flex-col justify-center items-center w-1/5 rounded-lg bg-white ">
        <h2 className="font-extrabold">Student Details</h2>
        {student.length === 1 && (
          <div className="m-4">
            <h2>
              <span className=" font-semibold">ID:</span>
              {student[0].id}
            </h2>
            <h2>
              <span className=" font-semibold">NAME:</span>
              {student[0].name}
            </h2>
            <h2>
              <span className=" font-semibold">EMAIL:</span>
              {student[0].email}
            </h2>
            <h2>
              <span className=" font-semibold">STUDY:</span>
              {student[0].study}
            </h2>
            <h2>
              <span className=" font-semibold">PHONE:</span>
              {student[0].phonenumber}
            </h2>
          </div>
        )}
      </div>
      <div className=" text-white bg-gradient-to-br from-cyan-400  to-indigo-900 rounded-md mt-4 px-3 py-[0.25rem]">
        <button>
          <NavLink to="/">Back</NavLink>
        </button>
      </div>
    </div>
  );
};

export default View;
