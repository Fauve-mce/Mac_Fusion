// Importer les modules nécessaires
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();  // Pour utiliser les variables d'environnement (par exemple, l'URL MongoDB)

// Créer l'application Express
const app = express();

// Utiliser CORS pour autoriser les requêtes depuis le frontend
app.use(cors());

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

//les options useNewUrlParser et useUnifiedTopology sont désormais obsolètes et n'ont plus d'effet depuis la version 4.0.0 du pilote Node.js de MongoDB !!!!!! 
// Connexion à MongoDB avec Mongoose
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('Connexion à MongoDB réussie'))
// .catch((error) => console.log('Erreur de connexion à MongoDB: ', error));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((error) => console.log('Erreur de connexion à MongoDB :', error));



// Exemple de route (une route de base pour tester)
app.get('/', (req, res) => {
    res.send('API fonctionne');
});

// Démarrer le serveur sur un port spécifique (par défaut 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
