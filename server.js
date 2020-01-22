const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// init middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to contact API' });
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Server start
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
