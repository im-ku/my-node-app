const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// מאפשר לשרת לקרוא נתונים שנשלחים מטפסים
app.use(express.urlencoded({ extended: true }));

let tasks = ["ללמוד Node.js", "להעלות אפליקציה לענן"];

app.get('/', (req, res) => {
  let taskList = tasks.map((task, index) => 
    `<li>${task} <a href="/delete/${index}" style="color:red; text-decoration:none;">✖</a></li>`
  ).join('');

  res.send(`
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>לוח המשימות שלי</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; display: flex; justify-content: center; padding-top: 50px; }
        .container { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 350px; }
        h2 { color: #333; text-align: center; }
        ul { list-style: none; padding: 0; }
        li { background: #fff; border-bottom: 1px solid #eee; padding: 10px; display: flex; justify-content: space-between; }
        input[type="text"] { width: 70%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>המשימות שלי</h2>
        <form action="/add" method="POST">
          <input type="text" name="newTask" placeholder="משימה חדשה..." required>
          <button type="submit">הוסף</button>
        </form>
        <ul>${taskList}</ul>
      </div>
    </body>
    </html>
  `);
});

// נתיב להוספת משימה
app.post('/add', (req, res) => {
  tasks.push(req.body.newTask);
  res.redirect('/');
});

// נתיב למחיקת משימה
app.get('/delete/:id', (req, res) => {
  tasks.splice(req.params.id, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
