const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000; // Choose your desired port

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'www.pezabond.com',
  user: 'u314956449_admin',
  password: '0971121085joe',
  database: 'u314956449_pezabond',
});

// Middleware for parsing JSON
app.use(express.json());

// Register a new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the user into the database
  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering user' });
      } else {
        res.json({ message: 'User registered successfully' });
      }
    }
  );
});

// Login a user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the database
  db.query(
    'SELECT * FROM customers WHERE email = ?',
    [username],
    async (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error logging in' });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Invalid username or password' });
      } else {
        const user = results[0];

        // Compare the hashed password with the provided password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Create a JSON Web Token (JWT)
          const token = jwt.sign({ username: user.username }, 'your_secret_key');

          res.json({ token });
        } else {
          res.status(401).json({ error: 'Invalid username or password' });
        }
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
