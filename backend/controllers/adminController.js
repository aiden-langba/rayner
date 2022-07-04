const db = require("../config/database");
const bcrypt = require("bcrypt");
const express = require("express");
const { query } = require("../config/database");

exports.listEmployees = (req, res) => {
  db.query("select * from employee")
    .then((results) => res.send(results.rows))
    .catch((e) => console.log(e));
};

exports.createEmployee = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    gender,
    dob,
    phoneno,
    address
  } = req.body;

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const hashPassword = await bcrypt.hash(password, salt);

  const sql = ` insert into  employee (firstname,lastname,email,password,gender,dob,phoneno,address)  values ($1, $2, $3, $4, $5, $6, $7, $8 )`;
  db.query(sql, [
    firstname,
    lastname,
    email,
    hashPassword,
    gender,
    dob,
    phoneno,
    address
  ])
    .then(() => res.send("Employee created"))
    .catch((e) => console.log(e));
};

exports.adminLogin = async (req, res) => {
  console.log("req.body", req.body);
  const { email, password } = req.body;

  db.query(
    `select email, password from admin where lower(email) like lower('${email}')`
  )
    .then(async (results) => {
      const validPassword = await bcrypt.compare(
        password,
        results.rows[0].password
      );
      if (validPassword) {
        res.status(200).send({ message: "Valid password", user: email });
      } else {
        res.status(400).send({ error: "Invalid Password" });
      }
    })
    .catch((err) => res.status(400).send({ error: "Invalid Email" }));
};

exports.listEmployeesLeave = (req, res) => {
  db.query(
    `select * from leave inner join employee on leave.employeeid=employee.employeeid`
  )
    .then((results) => res.send(results.rows))
    .catch((err) =>
      setImmediate(() => {
        throw err;
      })
    );
};

exports.approveLeave = (req, res) => {
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const placeholder = keys.map((item, i) => `${item}  =  \$${i + 1}`);
  const sql = ` update leave SET ${placeholder} where leaveid = ${req.params.employeeid} `;
  db.query(sql, values)
    .then(() => res.send(`Leave for ${req.params.employeeid} approve`))
    .catch((e) => console.log(e));
};

exports.updateEmployee = (req, res) => {
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  console.log("req.body", req.body);
  const placeholder = keys.map((item, i) => `${item}  =  \$${i + 1}`);
  const sql = ` update employee SET ${placeholder} where employeeid = ${req.params.employeeid} `;
  db.query(sql, values)
    .then(() => res.send(`Employee with ${req.params.employeeid}`))
    .catch((e) => console.log(e));
};

exports.deleteEmployee = (req, res) => {
  const sql = `DELETE FROM employee where employeeid = ${req.params.employeeid} `;
  console.log(sql);
  db.query(sql)
    .then(() => res.send(`Employee with ${req.params.employeeid} deleted`))
    .catch((e) => console.log(e));
};
