const bcrypt = require("bcrypt");

const {
  findUserByUsername,
  findUserByEmail,
  createUser,
} = require("../models/userQueries");

// ========================
// REGISTER
// ========================

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!username || !email || !password) {
      return res
        .status(400)
        .send("Please fill in all fields.");
    }

    // Kiểm tra username đã tồn tại chưa
    const existingUsername =
      await findUserByUsername(username);

    if (existingUsername) {
      return res
        .status(400)
        .send("Username already exists.");
    }

    // Kiểm tra email đã tồn tại chưa
    const existingEmail =
      await findUserByEmail(email);

    if (existingEmail) {
      return res
        .status(400)
        .send("Email already exists.");
    }

    // Hash password trước khi lưu database
    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(
      password,
      saltRounds
    );

    // Role mặc định sẽ là employee từ database
    await createUser(
      username,
      email,
      passwordHash
    );

    return res.redirect("/login");
  } catch (error) {
    console.error("Register error:", error);

    return res
      .status(500)
      .send("Internal server error.");
  }
}


// ========================
// LOGIN
// ========================

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send("Please enter username and password.");
    }

    // Tìm user trong database
    const user =
      await findUserByUsername(username);

    // Không tiết lộ username có tồn tại hay không
    if (!user) {
      return res
        .status(401)
        .send("Invalid username or password.");
    }

    // So sánh password nhập vào với hash trong DB
    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password_hash
      );

    if (!passwordMatch) {
      return res
        .status(401)
        .send("Invalid username or password.");
    }

    // Lưu thông tin cần thiết vào session
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      employee_id: user.employee_id,
    };

    // Login thành công → Employee Management
    return res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);

    return res
      .status(500)
      .send("Internal server error.");
  }
}


// ========================
// LOGOUT
// ========================

function logoutUser(req, res) {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error:", error);

      return res
        .status(500)
        .send("Unable to log out.");
    }

    // Xóa cookie session trên browser
    res.clearCookie("connect.sid");

    return res.redirect("/login");
  });
}


// ========================
// EXPORTS
// ========================

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};