const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Success@143',
  database: 'student_db',
};

app.use(express.static('public'));
const pool = mysql.createPool(dbConfig);
app.use(express.json());

app.post('/register', async (req, res) => {
  const { fullName, email,password, phone,dob,gender,locationInput } = req.body;

  if ( !fullName || !email || !phone || !password || !locationInput) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
    const connection = await pool.getConnection();
    const query = 'INSERT INTO students ( fullName, email,password, phone, dob,gender,location) VALUES (?, ?, ?, ?,?,?,?)';
    await connection.query(query, [ fullName, email, password,phone,dob,gender,locationInput]);
    connection.release();

    res.json({ message: 'Student registered successfully!' });
  } catch (err) {
    console.error('Error registering student:', err);
    res.status(500).json({ error: 'An error occurred while registering the student.' });
  }
});

app.get('/register', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const query = 'SELECT * FROM students';
    const [rows] = await connection.query(query);
    connection.release();

    res.json(rows);
  } catch (err) {
    console.error('Error retrieving students:', err);
    res.status(500).json({ error: 'An error occurred while retrieving students in app.js.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
