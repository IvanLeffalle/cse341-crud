const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require("./data/mongodb.js");

app.use(express.json());

app.use((res, req, next) => {
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
    "Z-Key"
  );
  next();
});

app.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

app.use("/", require("./routes/index.js"));

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
