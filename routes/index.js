const router = require("express").Router();

router.use("/", require("./swagger.js"));

router.get("/", (req, res) => {
  //#Swagger.tags=["Hello World"]

  res.send("hello world");
});

router.use("/lengths", require("./lengths.js"));
router.use("/kFiles", require("./kFiles.js"));

module.exports = router;
