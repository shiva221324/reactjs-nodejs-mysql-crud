import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

app.listen(8080, () => {
  console.log("backend started");
});

app.get("/", (req, res) => {
  const q = "select * from students";
  try {
    connection.query(q, (error, result) => {
      if (error) return res.json(error);

      return res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/add", (req, res) => {
  const q =
    "insert into students (`name`, `email`, `study`,`phonenumber`) values (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.study,
    req.body.phonenumber,
  ];
  //  console.log(values);
  connection.query(q, [values], (error, result) => {
    if (error) return res.json(error);
    return res.json("Book has been created successfully");
  });
});

app.delete("/:id", (req, res) => {
  const stuid = req.params.id;
  const q = "delete from students where id=?";
  // console.log(stuid);
  connection.query(q, [stuid], (error, result) => {
    if (error) return res.json(error);
    return res.json("Book has been created successfully");
  });
});

app.get("/view/:id", (req, res) => {
  const q = "select * from students where id= (?)";
  const stuid = req.params.id;
  try {
    connection.query(q, [stuid], (error, result) => {
      if (error) return res.json(error);
      return res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  const q =
    "update students set `name`=? ,`email`=?, `study`=?,`phonenumber`=? where id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.study,
    req.body.phonenumber,
    id,
  ];
  try {
    connection.query(q, values, (error, result) => {
      if (error) return res.json(error);
      return res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});
