// server/server.js
const http = require('http');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
  databaseURL: process.env.FIREBASE_DB,
});

const db = admin.firestore();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    const form = formidable({ multiples: false });

    form.parse(req, (err, fields, files) => {
      if (err || !files.image) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid file upload' }));
        return;
      }

      const filePath = files.image.filepath;

      cloudinary.uploader.upload(filePath, { folder: 'pageturner_uploads' }, async (err, result) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Cloudinary upload failed' }));
        } else {
          await db.collection('images').add({
            url: result.secure_url,
            createdAt: new Date(),
          });

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ url: result.secure_url }));
        }
      });
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
