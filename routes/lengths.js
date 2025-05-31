const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validate.js");
const isAuthenticated = require("../middlewares/authenticate.js");

const lengthsController = require("../controllers/lengthsController.js");

router.get("/", lengthsController.getLengths);
router.get("/:id", lengthsController.getLengthsById);

router.post(
  "/",
  isAuthenticated,
  validation.saveLength,
  lengthsController.createLength
);
router.put(
  "/:id",
  isAuthenticated,
  validation.saveLength,
  lengthsController.updateLength
);
router.delete("/:id", isAuthenticated, lengthsController.deleteLength);

module.exports = router;
