const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require("./data/mongodb.js");
const passport = require("passport");
const session = require("express-session");
const githubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

app
  .use(express.json())
  .use(
    session({
      secret: "secret_key",
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use((res, req, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE",
      "OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origins",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Z-Key",
      "Authorization"
    );
    next();
  })
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    })
  )
  .use("/", require("./routes/index.js"));

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        process.env.CALLBACK_URL ||
        "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Hello ${req.session.user.username}`
      : "Logged Out"
  );
});

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

app.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and Server is running on port ${port}`);
    });
  }
});
