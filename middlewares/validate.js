const validator = require("../helpers/validate");
const saveLength = async (req, res, next) => {
  const validationRule = {
    code: "required|string",
    name: "required|string",
    length_mm: "required|string",
  };

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};

const validateKFile = async (req, res, next) => {
  const validationRule = {
    file: "required|string",
    size: "required|string",
    color_code: "required|string",
  };

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};

module.exports = {
  saveLength,
  validateKFile,
};
