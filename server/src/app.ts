import express from 'express';

import { connectToDatabase } from './services/database.service';

// Routes
import { ingredientsRouter } from './routes/ingredients.route';


const app = express();
const port = 3000;

// Connect to database
connectToDatabase().then(() => {
  app.use('/ingredients', ingredientsRouter);
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}).catch((error: Error) => {
  console.error("Database connection failed", error);
  process.exit();
});