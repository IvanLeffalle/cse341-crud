const mongodb = require("../data/mongodb.js");
const { ObjectId } = require("mongodb");

const getKFiles = async (req, res) => {
  //#Swagger-tags=["KFiles"]
  try {
    const db = mongodb.getDb();
    const result = await db.collection("k_files").find();
    const kFiles = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(kFiles);
  } catch (err) {
    console.error("Error fetching KFiles:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getKFilesById = async (req, res) => {
  //#Swagger-tags=["KFiles"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const id = req.params.id;
  try {
    const db = mongodb.getDb();
    const result = await db
      .collection("k_files")
      .find({ _id: new ObjectId(id) });
    const data = await result.toArray();
    if (data.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(data[0]);
    } else {
      res.status(404).json({ error: "KFile not found" });
    }
  } catch (err) {
    console.error("Error fetching KFile by ID:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createKFile = async (req, res) => {
  //#Swagger-tags=["KFiles"]
  const newKFile = {
    file: req.body.file,
    size: req.body.size,
    color_code: req.body.color_code,
  };
  try {
    const db = mongodb.getDb();
    const result = await db.collection("k_files").insertOne(newKFile);
    res.status(201).json({ message: "KFile created", id: result.insertedId });
  } catch (err) {
    console.error("Error creating KFile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateKFile = async (req, res) => {
  //#Swagger-tags=["KFiles"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const id = req.params.id;
  const updatedKFile = {
    file: req.body.file,
    size: req.body.size,
    color_code: req.body.color_code,
  };
  try {
    const db = mongodb.getDb();
    const result = await db
      .collection("k_files")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedKFile });
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "KFile updated successfully" });
    } else {
      res.status(404).json({ error: "KFile not found or no changes made" });
    }
  } catch (err) {
    console.error("Error updating KFile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteKFile = async (req, res) => {
  //#Swagger-tags=["KFiles"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const id = req.params.id;
  try {
    const db = mongodb.getDb();
    const result = await db
      .collection("k_files")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "KFile deleted successfully" });
    } else {
      res.status(404).json({ error: "KFile not found" });
    }
  } catch (err) {
    console.error("Error deleting KFile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getKFiles,
  getKFilesById,
  createKFile,
  updateKFile,
  deleteKFile,
};
