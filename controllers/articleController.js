// Import Article model
const Article = require("../models/Article");

// Import slug generator utility
const generateSlug = require("../utils/slugGenerator");

// ========================================
// CREATE ARTICLE
// Route: POST /articles
// ========================================

const createArticle = async (req, res) => {
  try {
    // Extract values from request body
    const {
      title,
      content,
      excerpt,
      author,
      category,
      tags,
      featuredImage,
      status,
      readingTime,
    } = req.body;

    // Generate slug automatically from title
    const slug = generateSlug(title);

    // Check if article with same slug already exists
    const existingArticle = await Article.findOne({ slug });

    if (existingArticle) {
      return res.status(400).json({
        error: "An article with this title already exists",
      });
    }

    // Create new article in MongoDB
    const article = await Article.create({
      title,
      slug,
      content,
      excerpt,
      author,
      category,
      tags,
      featuredImage,
      status,
      readingTime,
    });

    // Return success response
    res.status(201).json({
      message: "Article created successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// ========================================
// GET ALL ARTICLES
// ========================================

const getAllArticles = async (req, res) => {
  try {
    // Find all published articles
    const articles = await Article.find();

    // Return success response
    res.status(200).json({
      message: "Articles fetched successfully",
      count: articles.length,
      articles,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// ========================================
// GET SINGLE ARTICLE BY SLUG
// ========================================

const getSingleArticle = async (req, res) => {
  try {
    // Get slug from URL params
    const { slug } = req.params;

    // Find article using slug
    const article = await Article.findOne({ slug });

    // If article does not exist
    if (!article) {
      return res.status(404).json({
        error: "Article not found",
      });
    }

    // Return success response
    res.status(200).json({
      message: "Article fetched successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// ========================================
// UPDATE ARTICLE
// ========================================

const updateArticle = async (req, res) => {
  try {
    // Get slug from URL
    const { slug } = req.params;

    // Get incoming update data
    const updateData = req.body;

    // If title is being updated,
    // generate a new slug automatically
    if (updateData.title) {
      updateData.slug = generateSlug(updateData.title);
    }

    // Find article by old slug and update it
    const updatedArticle = await Article.findOneAndUpdate(
      { slug },
      updateData,
      {
        returnDocument: "after", // return updated document
        runValidators: true, // enforce schema validation
      },
    );

    // If article not found
    if (!updatedArticle) {
      return res.status(404).json({
        error: "Article not found",
      });
    }

    // Success response
    res.status(200).json({
      message: "Article updated successfully",
      article: updatedArticle,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// ========================================
// DELETE ARTICLE
// ========================================

const deleteArticle = async (req, res) => {
  try {
    // Get slug from URL
    const { slug } = req.params;

    // Find article and delete it
    const deletedArticle = await Article.findOneAndDelete({ slug });

    // If article does not exist
    if (!deletedArticle) {
      return res.status(404).json({
        error: "Article not found",
      });
    }

    // Success response
    res.status(200).json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// ========================================
// SEARCH ARTICLES
// ========================================

const searchArticles = async (req, res) => {
  try {
    // Get search query from URL
    const { q } = req.query;

    // If no query is provided
    if (!q) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    // Search using MongoDB text index
    const articles = await Article.find({
      $text: {
        $search: q,
      },
    });

    // If no articles found
    if (articles.length === 0) {
      return res.status(404).json({
        error: "No matching articles found",
      });
    }

    // Success response
    res.status(200).json({
      message: "Search completed successfully",
      count: articles.length,
      articles,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Export controller
module.exports = {
  createArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
};
