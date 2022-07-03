const { Client } = require("pg");

const client = new Client({
  host: "127.0.0.1",
  user: "postgres",
  database: "rayner",
  password: "password",
  port: 5432,
});

const execute = async (query) => {
  try {
    await client.connect(); // gets connection
    await client.query(query); // sends queries
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await client.end(); // closes connection
  }
};
const Table = `
create table employee(
    employeeid SERIAL PRIMARY KEY,
    firstName VARCHAR(30),
    lastname VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(30),
    gender VARCHAR(10),
    dob DATE,
    phoneno BIGINT,
    address TEXT
);
create table attendance(
  attendanceid SERIAL PRIMARY KEY,
  checkin TIME,
  checkout TIME,
  attendancedate DATE,
  employeeid BIGINT REFERENCES employee(employeeid)
);
create table leave(
  leaveid SERIAL  PRIMARY KEY,
  leaveType VARCHAR(50),
  startdate DATE,
  enddate DATE,
  reason VARCHAR(50),
  leavestatus VARCHAR(50),
  employeeid BIGINT REFERENCES employee(employeeid)
);
create table admin(
  adminid SERIAL PRIMARY KEY,
  email VARCHAR(50),
  password VARCHAR(50)
);`;

execute(Table).then((result) => {
  if (result) {
    console.log("Table created");
  }
});
