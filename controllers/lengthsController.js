const mongodb = require("../data/mongodb.js");
const { ObjectId } = require("mongodb");

const getLengths = async (req, res) => {
  //#Swagger-tags=["Lengths"]
  try {
    const db = mongodb.getDb();
    const result = await db.collection("approximate_tooth_lengths").find();
    const lengths = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lengths);
  } catch (err) {
    console.error("Error fetching lengths:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLengthsById = async (req, res) => {
  //#Swagger-tags=["Lengths"]
  const id = req.params.id;
  try {
    const db = mongodb.getDb();
    const result = await db
      .collection("approximate_tooth_lengths")
      .find({ _id: new ObjectId(id) });
    const data = await result.toArray();
    if (data.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(data[0]);
    } else {
      res.status(404).json({ error: "Length not found" });
    }
  } catch (err) {
    console.error("Error fetching length by ID:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createLength = async (req, res) => {
  //#Swagger-tags=["Lengths"]
  const newLength = {
    code: req.body.code,
    name: req.body.name,
    length_mm: req.body.length_mm,
  };
  try {
    const db = mongodb.getDb();
    const result = await db
      .collection("approximate_tooth_lengths")
      .insertOne(newLength);
    res.status(201).json({ message: "Length created", id: result.insertedId });
  } catch (err) {
    console.error("Error creating length:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateLength = async (req, res) => {
  //#Swagger-tags=["Lengths"]
  const id = new ObjectId(req.params.id);
  const newLength = {
    code: req.body.code,
    name: req.body.name,
    length_mm: req.body.length_mm,
  };
  try {
    const db = mongodb.getDb();
    const result = await db
      .collection("approximate_tooth_lengths")
      .replaceOne({ _id: id }, newLength);
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Length updated" });
    } else {
      res.status(404).json({ error: "Length not found" });
    }
  } catch (err) {
    console.error("Error updating length:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteLength = async (req, res) => {
  //#Swagger-tags=["Lengths"]
  const id = new ObjectId(req.params.id);
  try {
    const db = mongodb.getDb();
    const result = await db
      .collection("approximate_tooth_lengths")
      .deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Length deleted" });
    } else {
      res.status(404).json({ error: "Length not found" });
    }
  } catch (err) {
    console.error("Error deleting length:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getLengths,
  getLengthsById,
  createLength,
  updateLength,
  deleteLength,
};
