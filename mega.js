
   require('dotenv').config();
   const mega = require('megajs');

   const EMAIL = process.env.MEGA_EMAIL;
   const PASSWORD = process.env.MEGA_PASSWORD;

   async function upload(fileStream, fileName) {
     return new Promise((resolve, reject) => {
       const storage = mega.storage({ email: EMAIL, password: PASSWORD });

       storage.on('ready', () => {
         const file = storage.upload({ name: fileName });
         fileStream.pipe(file);

         file.on('complete', () => resolve(file.link));
         file.on('error', reject);
       });

       storage.on('error', reject);
     });
   }

   module.exports = { upload };
   
