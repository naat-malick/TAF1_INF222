const express = require('express');
const fs = require('fs');
let articles = require('../articles.json');

const router = express.Router();

// GET tous les articles
router.get('/', (req, res) => {
  res.json({ articles });
});

// GET un article par ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find(a => a.id === id);
  if (!article) return res.status(404).json({ error: "Article non trouvé" });
  res.json(article);
});

// POST créer un article
router.post('/', (req, res) => {
  const newArticle = {
    id: articles.length + 1,
    ...req.body
  };
  articles.push(newArticle);
  fs.writeFileSync('./articles.json', JSON.stringify(articles, null, 2));
  res.status(201).json(newArticle);
});

// PUT modifier un article
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = articles.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ error: "Article non trouvé" });

  articles[index] = { ...articles[index], ...req.body };
  fs.writeFileSync('./articles.json', JSON.stringify(articles, null, 2));
  res.json(articles[index]);
});

// DELETE supprimer un article
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  articles = articles.filter(a => a.id !== id);
  fs.writeFileSync('./articles.json', JSON.stringify(articles, null, 2));
  res.json({ message: "Article supprimé" });
});

// SEARCH rechercher un article
router.get('/search', (req, res) => {
  const query = req.query.query.toLowerCase();
  const results = articles.filter(a =>
    a.titre.toLowerCase().includes(query) ||
    a.contenu.toLowerCase().includes(query)
  );
  res.json({ results });
});

module.exports = router;
