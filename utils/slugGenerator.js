// Import slugify package
// This converts normal text into SEO-friendly slug
const slugify = require("slugify");

// ========================================
// GENERATE SLUG FUNCTION
// ========================================

const generateSlug = (title) => {
  return slugify(title, {
    // Convert to lowercase
    lower: true,

    // Remove special characters
    strict: true,

    // Remove unnecessary spaces
    trim: true,
  });
};

// Export function
module.exports = generateSlug;
