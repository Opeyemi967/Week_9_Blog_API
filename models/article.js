// Import mongoose
const mongoose = require("mongoose");

// ========================================
// ARTICLE SCHEMA
// ========================================

const articleSchema = new mongoose.Schema(
  {
    // Blog title
    // Example: "How to Learn Node.js"
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // SEO-friendly URL slug
    // Example: how-to-learn-nodejs
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // Full blog content
    content: {
      type: String,
      required: true,
    },

    // Short summary for previews
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },

    // Article author
    author: {
      type: String,
      required: true,
      trim: true,
    },

    // Blog category
    // Example: Tech, Education, Politics
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // Tags for search and filtering
    // Example: ["Node.js", "Backend", "API"]
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // Featured image URL
    featuredImage: {
      type: String,
      default: "",
    },

    // Article publishing status
    // draft = not public yet
    // published = live article
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    // Estimated reading time
    // Example: "5 min read"
    readingTime: {
      type: String,
      default: "3 min read",
    },
  },

  // Automatically adds:
  // createdAt
  // updatedAt
  {
    timestamps: true,
  },
);

// ========================================
// TEXT INDEX FOR SEARCH FEATURE
// ========================================

// This allows MongoDB full-text search
articleSchema.index({
  title: "text",
  content: "text",
  category: "text",
  author: "text",
});

// Export model
module.exports = mongoose.model("Article", articleSchema);
