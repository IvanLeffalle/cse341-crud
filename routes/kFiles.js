const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validate.js");
const kFilesController = require("../controllers/kFiles.js");
const isAuthenticated  = require("../middlewares/authenticate.js");

router.get("/", kFilesController.getKFiles);
router.get("/:id", kFilesController.getKFilesById);
router.post(
  "/",
  isAuthenticated,
  validation.validateKFile,
  kFilesController.createKFile
);
router.put(
  "/:id",
  isAuthenticated,
  validation.validateKFile,
  kFilesController.updateKFile
);
router.delete("/:id", isAuthenticated, kFilesController.deleteKFile);

module.exports = router;
