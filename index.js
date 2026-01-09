const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// התחברות למסד הנתונים באמצעות המשתנה שהגדרת ב-Render
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('מחובר ל-MongoDB בהצלחה!'))
  .catch(err => console.error('שגיאת חיבור:', err));

// הגדרת מבנה הנתונים (משימה)
const Task = mongoose.model('Task', { text: String });

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const tasks = await Task.find();
  let taskList = tasks.map((t) => 
    `<li>${t.text} <a href="/delete/${t._id}" style="color:red; margin-right:10px; text-decoration:none;">✖</a></li>`
  ).join('');

  res.send(`
    <html dir="rtl">
    <head><meta charset="UTF-8"><title>משימות בענן</title></head>
    <body style="font-family: sans-serif; background: #eef2f3; padding: 50px; display: flex; justify-content: center;">
      <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 350px;">
        <h2 style="text-align: center; color: #333;">לוח המשימות הקבוע שלי</h2>
        <form action="/add" method="POST" style="display: flex; gap: 10px;">
          <input type="text" name="newTask" placeholder="מה יש לעשות?" required style="flex-grow: 1; padding: 8px;">
          <button type="submit" style="background: #28a745; color: white; border: none; padding: 8px 15px; cursor: pointer; border-radius: 5px;">הוסף</button>
        </form>
        <ul style="list-style: none; padding: 0; margin-top: 20px;">${taskList}</ul>
      </div>
    </body>
    </html>
  `);
});

app.post('/add', async (req, res) => {
  const task = new Task({ text: req.body.newTask });
  await task.save();
  res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(port, () => console.log(`Server started on port ${port}`));
