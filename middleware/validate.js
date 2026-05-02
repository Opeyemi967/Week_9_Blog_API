// ========================================
// VALIDATION MIDDLEWARE
// ========================================

// This middleware receives a Joi schema
// and validates incoming req.body before
// reaching the controller

const validate = (schema) => {
  return (req, res, next) => {
    // Validate request body using Joi
    const { error } = schema.validate(req.body);

    // If validation fails
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    // If validation passes,
    // move to next middleware/controller
    next();
  };
};

// Export middleware
module.exports = validate;
