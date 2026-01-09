const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>האפליקציה המעוצבת שלי</title>
      <style>
        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f2f5; margin: 0; }
        .card { background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
        h1 { color: #6200ee; }
        button { background: #6200ee; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>האפליקציה שלי בענן!</h1>
        <p>זהו דף HTML מעוצב שרץ על שרת Node.js.</p>
        <button onclick="alert('הכפתור עובד!')">לחץ עליי</button>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
