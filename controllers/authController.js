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
        .render(
          "register",
          {
            error:
              "Please fill in all fields.",

            formData: {
              username,
              email,
            },
          }
        );
    }


    const existingUsername =
      await findUserByUsername(
        username
      );


    if (existingUsername) {
      return res
        .status(400)
        .render(
          "register",
          {
            error:
              "Username already exists.",

            formData: {
              username,
              email,
            },
          }
        );
    }


    const existingEmail =
      await findUserByEmail(
        email
      );


    if (existingEmail) {
      return res
        .status(400)
        .render(
          "register",
          {
            error:
              "Email already exists.",

            formData: {
              username,
              email,
            },
          }
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
      "/login?registered=1"
    );

  } catch (error) {

    console.error(
      "Register error:",
      error
    );


    return res
      .status(500)
      .render(
        "register",
        {
          error:
            "Something went wrong. Please try again.",

          formData: {
            username:
              req.body.username || "",

            email:
              req.body.email || "",
          },
        }
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
        .render(
          "login",
          {
            error:
              "Please enter username and password.",

            username:
              username || "",

            success:
              null,
          }
        );
    }


    const user =
      await findUserByUsername(
        username
      );


    if (!user) {
      return res
        .status(401)
        .render(
          "login",
          {
            error:
              "Invalid username or password.",

            username,

            success:
              null,
          }
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
        .render(
          "login",
          {
            error:
              "Invalid username or password.",

            username,

            success:
              null,
          }
        );
    }


    req.session.regenerate(
      (error) => {

        if (error) {

          console.error(
            "Session regenerate error:",
            error
          );


          return res
            .status(500)
            .render(
              "login",
              {
                error:
                  "Unable to create your session. Please try again.",

                username,

                success:
                  null,
              }
            );
        }


        req.session.user = {
          id:
            user.id,

          username:
            user.username,

          role:
            user.role,

          employee_id:
            user.employee_id,
        };


        return res.redirect(
          "/employees"
        );
      }
    );

  } catch (error) {

    console.error(
      "Login error:",
      error
    );


    return res
      .status(500)
      .render(
        "login",
        {
          error:
            "Something went wrong. Please try again.",

          username:
            req.body.username || "",

          success:
            null,
        }
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
          .render(
            "error-page",
            {
              statusCode: 500,

              title:
                "Logout Failed",

              message:
                "Unable to log out. Please try again.",
            }
          );
      }


      res.clearCookie(
        "connect.sid"
      );


      return res.redirect(
        "/"
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