const Joi = require("joi");

exports.validateSignIn = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  try {
    const validation = schema.validate(body);
    if (validation.error) {
      return res.status(400).send({
        status: "error",
        message: "Invalid request data",
      });
    }
  } catch (err) {
    throw err;
  }
  next();
};

exports.validateCreateCenter = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    shortcut: Joi.string().required(),
  });

  try {
    const validation = schema.validate(body);
    if (validation.error) {
      return res.status(400).send({
        status: "error",
        message: "Invalid request data",
      });
    }
  } catch (err) {
    throw err;
  }
  next();
};

exports.validateEditCenter = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    shortcut: Joi.string().required(),
  });

  try {
    const validation = schema.validate(body);
    if (validation.error) {
      return res.status(400).send({
        status: "error",
        message: "Invalid request data",
      });
    }
  } catch (err) {
    throw err;
  }
  next();
};

exports.validateDeleteCenter = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    id: Joi.number().required(),
  });

  try {
    const validation = schema.validate(body);
    if (validation.error) {
      return res.status(400).send({
        status: "error",
        message: "Invalid request data",
      });
    }
  } catch (err) {
    throw err;
  }
  next();
};
