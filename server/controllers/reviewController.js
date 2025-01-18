const { Review } = require("../models");

const createReview = async (req, res) => {
  const { content, rating } = req.body;

  try {
    if (!content || typeof content !== "string") {
      return res
        .status(400)
        .json({ message: "Content is required and must be a string." });
    }
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be a number between 1 and 5." });
    }

    const newReview = await Review.create({
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
    if (!toUpdate.content || typeof toUpdate.content !== "string") {
      return res
        .status(400)
        .json({ message: "Content is required and must be a string." });
    }
    if (
      !toUpdate.rating ||
      typeof toUpdate.rating !== "number" ||
      toUpdate.rating < 1 ||
      toUpdate.rating > 5
    ) {
      return res
        .status(400)
        .json({ message: "Rating must be a number between 1 and 5." });
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
};
