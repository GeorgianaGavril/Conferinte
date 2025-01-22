const {
  validateArticle,
  validateUpdateArticle,
} = require("../utils/validation");
const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");
const { Article, User, ConferenceReviewer, Conference } = require("../models");

const createArticle = async (req, res) => {
  try {
    let { title, content, idAuthor, idConference } = req.body;
    idConference = Number(idConference)
    const validation = validateArticle({ title, content, idAuthor, idConference });

    if (!validation.valid) {
      console.log(idConference)
      console.log(validation.message)
      return res.status(400).json({ message: validation.message });
    }

    const author = await User.findByPk(idAuthor);
    if (!author) {
      return res.status(404).json({ message: "Autorul nu a fost gasit" });
    }

    const conference = await Conference.findByPk(idConference)
    if (!conference) {
      return res.status(404).json({ message: "Conferinta nu a fost gasita" });
    }


    const reviewers = await getReviewers(idConference);
    const [reviewer1, reviewer2] = reviewers;
    console.log(reviewers)

    const newArticle = await Article.create({ title, content, idAuthor,idReviewer1: reviewer1,idReviewer2: reviewer2 });
    return res
      .status(201)
      .json({ message: "Articol creat cu succes", newArticle });
  } catch (e) {
    console.log(e.message)
    return res
      .status(500)
      .json({ message: "Eroare la crearea articolului", error: e.message });
  }
};

const getArticlesForReviewers = async (req, res) => {
  const id = req.params.id;

  try {
    const articles = await Article.findAll({
      where: {
        [Op.or]: [
          { idReviewer1: id },
          { idReviewer2: id }
        ]
      }
    });
    if (!articles) {
      return res.status(404).json({ message: "Nu au fost gasite articole" });
    }
    return res.status(200).json(articles);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getReviewers = async (id) => {
  try {
      const reviewers = await ConferenceReviewer.findAll({
        where: { idConference: id },
        attributes: ['idConference', 'idReviewer'], 
        order: Sequelize.literal('RAND()'),
        limit: 2,
        raw: true,
      });
    
  
      const reviewerIds = reviewers.map(reviewer => reviewer.idReviewer);
  
      console.log(reviewerIds);

      return reviewerIds;
    } catch (error) {
      console.error('Error fetching reviewers:', error);
      throw error; 
    }
};

const getArticleById = async (req, res) => {
  const id = req.params.id;

  try {
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Articolul nu a fost gasit" });
    }
    return res.status(200).json(article);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getArticlesByAuthorId = async (req, res) => {
  const id = req.params.id;

  try {
    const articles = await Article.findAll({
      where: {
        idAuthor: id
      }
    });
    if (!articles) {
      return res.status(404).json({ message: "Nu au fost gasite articole" });
    }
    return res.status(200).json(articles);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    if (!articles) {
      return res.status(404).json({ message: "Articolul nu a fost gasit" });
    }
    return res.status(200).json(articles);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const updateArticle = async (req, res) => {
  const id = req.params.id;
  const toUpdate = req.body;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Articolul nu a fost gasit" });
    }

    const validation = validateUpdateArticle(toUpdate);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }
    await article.update(toUpdate);
    return res
      .status(200)
      .json({ message: "Article actualizat cu succes", article });
  } catch (e) {
    return res.status(500).json({
      message: "Eroare la actualizarea articolului",
      error: e.message,
    });
  }
};

const deleteArticle = async (req, res) => {
  const id = req.params.id;

  try {
    const article = await Article.findByPk(id);
    await article.destroy();
    return res.status(200).json({ message: "Articol sters cu succes" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Eroare la stergerea articolului", error: e.message });
  }
};

module.exports = {
  createArticle,
  getArticleById,
  getAllArticles,
  updateArticle,
  deleteArticle,
  getArticlesByAuthorId,
  getArticlesForReviewers
};
