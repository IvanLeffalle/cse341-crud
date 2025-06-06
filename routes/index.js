const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger.js"));

router.get("/", (req, res) => {
  //#Swagger.tags=["Hello World"]

  res.send("hello world");
});

router.use("/lengths", require("./lengths.js"));
router.use("/kFiles", require("./kFiles.js"));

router.get(
  "/login",
  passport.authenticate("github", (req, res) => {})
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
module.exports = router;
