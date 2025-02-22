import express, { json } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(json());

// Test route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
