
# TAF1_INF222 - API Blog

## 📌 Description
Projet académique INF222 : Développement d’une API backend avec **Node.js + Express** sur Android (Termux).  
L’API permet de gérer un blog avec les fonctionnalités suivantes :
- Créer un article
- Lire tous les articles
- Lire un article par ID
- Modifier un article
- Supprimer un article
- Rechercher des articles par mot-clé

## ⚙️ Installation
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/naat-malick/TAF1_INF222.git
   cd TAF1_INF222
   ```
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Lancer le serveur :
   ```bash
   node server.js
   ```

## 🔗 Endpoints
- `POST /api/articles`
- `GET /api/articles`
- `GET /api/articles/:id`
- `PUT /api/articles/:id`
- `DELETE /api/articles/:id`
- `GET /api/articles/search?query=texte`

## 🧪 Tests
Les tests ont été réalisés avec **Postman Android** en utilisant l’adresse IP locale `172.20.10.2`.

## 👨‍💻 Auteur
- Abdel Ngando (INF222)

