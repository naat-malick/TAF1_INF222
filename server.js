const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

// Charger les articles depuis le fichier JSON
let articles = require('./articles.json');

// GET tous les articles
app.get('/api/articles', (req, res) => {
  res.json({ articles });
});

// GET un article par ID
app.get('/api/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find(a => a.id === id);
  if (!article) return res.status(404).json({ error: "Article non trouvé" });
  res.json(article);
});

// POST créer un article
app.post('/api/articles', (req, res) => {
  const newArticle = {
    id: articles.length + 1,
    ...req.body
  };
  articles.push(newArticle);
  fs.writeFileSync('./articles.json', JSON.stringify(articles, null, 2));
  res.status(201).json(newArticle);
});

// PUT modifier un article
app.put('/api/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = articles.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ error: "Article non trouvé" });

  articles[index] = { ...articles[index], ...req.body };
  fs.writeFileSync('./articles.json', JSON.stringify(articles, null, 2));
  res.json(articles[index]);
});

// DELETE supprimer un article
app.delete('/api/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  articles = articles.filter(a => a.id !== id);
  fs.writeFileSync('./articles.json', JSON.stringify(articles, null, 2));
  res.json({ message: "Article supprimé" });
});

// SEARCH rechercher un article
app.get('/api/articles/search', (req, res) => {
  const query = req.query.query.toLowerCase();
  const results = articles.filter(a =>
    a.titre.toLowerCase().includes(query) ||
    a.contenu.toLowerCase().includes(query)
  );
  res.json({ results });
});

// Lancer le serveur
app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
