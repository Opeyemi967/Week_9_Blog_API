// Import express
const express = require("express");

// Create router instance
const router = express.Router();

// Import controller
const {
  createArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
} = require("../controllers/articleController");

// Import Joi validator
const articleValidationSchema = require("../validators/articleValidator");

// Import validation middleware
const validate = require("../middleware/validate");

// ========================================
// CREATE ARTICLE
// Route: POST /articles
// ========================================

// Validation runs BEFORE controller
router.post("/", validate(articleValidationSchema), createArticle);

// ========================================
// GET ALL ARTICLES
// Route: GET /articles
// ========================================

router.get("/", getAllArticles);

// ========================================
// SEARCH ARTICLES
// Route: GET /articles/search
// ========================================
router.get("/search", searchArticles);

// ========================================
// GET SINGLE ARTICLE BY SLUG
// Route: GET /articles/:slug
// ========================================

router.get("/:slug", getSingleArticle);

// ========================================
// UPDATE ARTICLE
// Route: PUT /articles/:slug
// ========================================

router.patch("/:slug", validate(articleValidationSchema), updateArticle);

// ========================================
// DELETE ARTICLE
// Route: DELETE /articles/:slug
// ========================================
router.delete("/:slug", deleteArticle);

// Export router
module.exports = router;
