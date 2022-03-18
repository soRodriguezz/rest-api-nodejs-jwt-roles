import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

import {createRoles} from './libs/initialSetup';

import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';

const app = express();
createRoles();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: pkg.name,
    author: pkg.author,
    description: pkg.description,
    version: pkg.version,
  });
});

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

export default app;
