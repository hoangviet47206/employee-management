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
    const {
      username,
      email,
      password,
    } = req.body;


    if (
      !username ||
      !email ||
      !password
    ) {
      return res
        .status(400)
        .send(
          "Please fill in all fields."
        );
    }


    const existingUsername =
      await findUserByUsername(
        username
      );

    if (existingUsername) {
      return res
        .status(400)
        .send(
          "Username already exists."
        );
    }


    const existingEmail =
      await findUserByEmail(
        email
      );

    if (existingEmail) {
      return res
        .status(400)
        .send(
          "Email already exists."
        );
    }


    const saltRounds = 10;

    const passwordHash =
      await bcrypt.hash(
        password,
        saltRounds
      );


    await createUser(
      username,
      email,
      passwordHash
    );


    return res.redirect(
      "/login"
    );
  } catch (error) {
    console.error(
      "Register error:",
      error
    );

    return res
      .status(500)
      .send(
        "Internal server error."
      );
  }
}


// ========================
// LOGIN
// ========================

async function loginUser(req, res) {
  try {
    const {
      username,
      password,
    } = req.body;


    if (
      !username ||
      !password
    ) {
      return res
        .status(400)
        .send(
          "Please enter username and password."
        );
    }


    const user =
      await findUserByUsername(
        username
      );


    if (!user) {
      return res
        .status(401)
        .send(
          "Invalid username or password."
        );
    }


    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password_hash
      );


    if (!passwordMatch) {
      return res
        .status(401)
        .send(
          "Invalid username or password."
        );
    }


    // Tạo session mới sau khi login thành công
    req.session.regenerate(
      (error) => {
        if (error) {
          console.error(
            "Session regenerate error:",
            error
          );

          return res
            .status(500)
            .send(
              "Internal server error."
            );
        }


        req.session.user = {
          id: user.id,
          username: user.username,
          role: user.role,
          employee_id:
            user.employee_id,
        };


        return res.redirect("/");
      }
    );

  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    return res
      .status(500)
      .send(
        "Internal server error."
      );
  }
}


// ========================
// LOGOUT
// ========================

function logoutUser(req, res) {
  req.session.destroy(
    (error) => {
      if (error) {
        console.error(
          "Logout error:",
          error
        );

        return res
          .status(500)
          .send(
            "Unable to log out."
          );
      }


      res.clearCookie(
        "connect.sid"
      );


      return res.redirect(
        "/login"
      );
    }
  );
}


// ========================
// EXPORTS
// ========================

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};