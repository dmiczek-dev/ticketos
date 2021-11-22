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
    centerId: Joi.number().required(),
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
    centerId: Joi.number().required(),
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

exports.validateCreateOffice = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    audio: Joi.boolean().required(),
    type: Joi.string().required(),
    centerId: Joi.number().required(),
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

exports.validateEditOffice = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    officeId: Joi.number().required(),
    name: Joi.string().required(),
    audio: Joi.boolean().required(),
    type: Joi.string().required(),
    centerId: Joi.number().required(),
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

exports.validateDeleteOffice = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    officeId: Joi.number().required(),
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

exports.validateCreateTicketType = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    mark: Joi.string().required(),
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

exports.validateEditTicketType = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    ticketTypeId: Joi.number().required(),
    name: Joi.string().required(),
    mark: Joi.string().required(),
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

exports.validateDeleteTicketType = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    ticketTypeId: Joi.number().required(),
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

exports.validateCreateLab = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    centerId: Joi.number().required(),
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

exports.validateEditLab = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    labId: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    centerId: Joi.number().required(),
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

exports.validateDeleteLab = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    labId: Joi.number().required(),
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

exports.validateCreatePrinterSetting = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    title: Joi.string(),
    subtitle: Joi.string(),
    statement: Joi.string(),
    centerId: Joi.number().required(),
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

exports.validateEditPrinterSetting = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    printerSettingId: Joi.number().required(),
    title: Joi.string(),
    subtitle: Joi.string(),
    statement: Joi.string(),
    centerId: Joi.number().required(),
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

exports.validateDeletePrinterSetting = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    printerSettingId: Joi.number().required(),
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
