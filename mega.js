
const { Storage } = require('megajs');

const storage = new Storage({
  email: process.env.MEGA_EMAIL,
  password: process.env.MEGA_PASSWORD
});

storage.login((err) => {
  if (err) {
    console.error('Erreur de connexion à Mega:', err);
    return;
  }

  console.log('Connecté à Mega avec succès.');

  storage.mount((err) => {
    if (err) {
      console.error('Erreur lors du montage du stockage Mega:', err);
      return;
    }

    console.log('Stockage Mega monté.');
  });
});
