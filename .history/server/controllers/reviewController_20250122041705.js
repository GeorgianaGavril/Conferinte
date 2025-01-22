const { Review } = require("../models");
const { validateReview } = require("../utils/validation");
const { validateUpdateReview } = require("../utils/validation");

const { Op } = require("sequelize");
const { Article } = require("../models");

const getAssignedArticles = async (req, res) => {
  const reviewerId = req.params.reviewerId;

  try {
    const articles = await Article.findAll({
      where: {
        [Op.or]: [
          { idReviewer1: reviewerId },
          { idReviewer2: reviewerId },
        ],
      },
    });

    if (!articles || articles.length === 0) {
      return res.status(404).json({ message: "Nu există articole asignate acestui reviewer." });
    }

    return res.status(200).json(articles);
  } catch (e) {
    console.error("Eroare la preluarea articolelor asignate:", e.message);
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getAssignedArticles,
};


const createReview = async (req, res) => {
  const { idArticle, idReviewer, content, rating } = req.body;

  const validation = validateReview({ idArticle, idReviewer, content, rating });
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  try {
    const newReview = await Review.create({
      idArticle,
      idReviewer,
      content,
      rating,
    });
    return res
      .status(201)
      .json({ message: "Review creat cu succes", newReview });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Eroare la crearea review-ului", error: e.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    if (!reviews) {
      return res.status(404).json({ message: "Reviews not found" });
    }
    return res.status(200).json(reviews);
  } catch (e) {
    return res.status(500).json({ message: "Server error!" });
  }
};

const getReviewById = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const updateReview = async (req, res) => {
  const id = req.params.id;
  const toUpdate = req.body;

  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const validation = validateUpdateReview(toUpdate);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    await review.update(toUpdate);
    return res.status(200).json({ message: "Review updated" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Could not update review", error: e.message });
  }
};

const deleteReview = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.destroy();
    return res.status(200).json({ message: "Review deleted!" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Could not delete review", error: e.message });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  //getAssignedArticles
};
