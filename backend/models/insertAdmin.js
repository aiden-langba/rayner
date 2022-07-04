const { Client } = require("pg");
const bcrypt = require("bcrypt");

const client = new Client({
  host: "127.0.0.1",
  user: "postgres",
  database: "rayner",
  password: "password",
  port: 5432
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
const hashPwd = async (pwd) => {
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  return await bcrypt.hash(pwd, salt);
};

hashPwd("1234").then((pwd) => {
  const insertAdmin = `
     INSERT INTO admin(
       email,
       password)  
       VALUES('rayner@sonicbolt.com', '${pwd}'
       )`;
  execute(insertAdmin);
});
