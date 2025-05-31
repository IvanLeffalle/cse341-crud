const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validate.js");
const kFilesController = require("../controllers/kFiles.js");

router.get("/", kFilesController.getKFiles);
router.get("/:id", kFilesController.getKFilesById);
router.post("/", validation.validateKFile, kFilesController.createKFile);
router.put("/:id", validation.validateKFile, kFilesController.updateKFile);
router.delete("/:id", kFilesController.deleteKFile);

module.exports = router;
