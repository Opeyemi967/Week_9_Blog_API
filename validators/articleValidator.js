// Import Joi
// Joi helps validate incoming request data
const Joi = require("joi");

// ========================================
// ARTICLE VALIDATION SCHEMA
// ========================================

const articleValidationSchema = Joi.object({
  // Blog title
  title: Joi.string().trim().min(5).max(150).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 5 characters",
    "any.required": "Title is required",
  }),

  // Full blog content
  content: Joi.string().min(50).required().messages({
    "string.empty": "Content is required",
    "string.min": "Content must be at least 50 characters",
  }),

  // Short summary
  excerpt: Joi.string().trim().min(10).max(300).required().messages({
    "string.empty": "Excerpt is required",
    "string.min": "Excerpt must be at least 10 characters",
  }),

  // Author name
  author: Joi.string().trim().required().messages({
    "string.empty": "Author is required",
  }),

  // Blog category
  category: Joi.string().trim().required().messages({
    "string.empty": "Category is required",
  }),

  // Tags array
  tags: Joi.array().items(Joi.string().trim()).optional(),

  // Featured image URL
  featuredImage: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Featured image must be a valid URL",
  }),

  // Publish status
  status: Joi.string().valid("draft", "published").optional().messages({
    "any.only": "Status must be draft or published",
  }),

  // Reading time
  readingTime: Joi.string().optional(),
});

// Export validation schema
module.exports = articleValidationSchema;
