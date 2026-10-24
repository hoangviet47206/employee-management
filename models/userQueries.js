const pool = require("./pool");

async function findUserByUsername(username) {
  const [rows] = await pool.execute("SELECT * FROM users WHERE username = ?", [
    username,
  ]);

  return rows[0];
}

async function findUserByEmail(email) {
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  return rows[0];
}

async function createUser(username, email, passwordHash) {
  const [result] = await pool.execute(
    `INSERT INTO users (username, email, password_hash)
     VALUES (?, ?, ?)`,
    [username, email, passwordHash],
  );

  return result;
}

module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUser,
};
