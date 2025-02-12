const {
  validateArticle,
  validateUpdateArticle,
} = require("../utils/validation");
const { Article, User } = require("../models");

const createArticle = async (req, res) => {
  try {
    const { title, content, idAuthor } = req.body;

    const validation = validateArticle({ title, content, idAuthor });

    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const author = await User.findByPk(idAuthor);
    if (!author) {
      return res.status(404).json({ message: "Autorul nu a fost gasit" });
    }

    const newArticle = await Article.create({ title, content, idAuthor });
    return res
      .status(201)
      .json({ message: "Articol creat cu succes", newArticle });
  } catch (e) {
    console.log("am ajuns pana aici");
    return res
      .status(500)
      .json({ message: "Eroare la crearea articolului", error: e.message });
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
};
