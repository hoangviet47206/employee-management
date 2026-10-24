const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const path = require("node:path");

const employeeRouter = require("./routes/employeeRouter");
const authRouter = require("./routes/authRouter");

dotenv.config();

const app = express();

const PORT =
  process.env.PORT || 8000;


/* ========================
   VIEW ENGINE
======================== */

app.set(
  "views",
  path.join(__dirname, "views")
);

app.set(
  "view engine",
  "ejs"
);


/* ========================
   RENDER PROXY
======================== */

if (
  process.env.NODE_ENV ===
  "production"
) {
  app.set(
    "trust proxy",
    1
  );
}


/* ========================
   MIDDLEWARE
======================== */

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  express.static(
    path.join(
      __dirname,
      "public"
    )
  )
);


/* ========================
   SESSION
======================== */

app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "dev-secret-key",

    resave: false,

    saveUninitialized: false,

    cookie: {
      httpOnly: true,

      sameSite: "lax",

      secure:
        process.env.NODE_ENV ===
        "production",

      maxAge:
        1000 *
        60 *
        30,
    },
  })
);


/* ========================
   GLOBAL USER
======================== */

app.use(
  (req, res, next) => {

    res.locals.currentUser =
      req.session.user ||
      null;

    next();
  }
);


/* ========================
   ROUTES
======================== */

app.use(
  "/",
  authRouter
);

app.use(
  "/",
  employeeRouter
);


/* ========================
   404 PAGE
======================== */

app.use(
  (req, res) => {

    res
      .status(404)
      .render(
        "error-page",
        {
          statusCode: 404,

          title:
            "Page Not Found",

          message:
            "The page you are looking for does not exist or may have been moved.",
        }
      );
  }
);


/* ========================
   GLOBAL ERROR HANDLER
======================== */

app.use(
  (
    error,
    req,
    res,
    next
  ) => {

    console.error(error);

    if (
      res.headersSent
    ) {
      return next(error);
    }

    const statusCode =
      error.statusCode ||
      error.status ||
      500;

    let title =
      "Something Went Wrong";

    let message =
      "An unexpected error occurred. Please try again later.";


    if (
      statusCode === 403
    ) {
      title =
        "Access Denied";

      message =
        "You do not have permission to access this resource.";
    }


    if (
      statusCode === 404
    ) {
      title =
        "Page Not Found";

      message =
        "The page you are looking for could not be found.";
    }


    res
      .status(statusCode)
      .render(
        "error-page",
        {
          statusCode,
          title,
          message,
        }
      );
  }
);


/* ========================
   START SERVER
======================== */

app.listen(
  PORT,
  (error) => {

    if (error) {
      throw error;
    }

    console.log(
      `Listening on port ${PORT}`
    );
  }
);