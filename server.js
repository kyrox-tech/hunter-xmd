const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Sert les fichiers HTML

app.get('/api/pair', (req, res) => {
  // Génère un pairing code aléatoire
  const pairingCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  res.json({ code: pairingCode });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:port`);
);
