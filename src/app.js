import express from 'express';
import cors from 'cors';
import config from './config/env.config.js';
import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js"
import mocksRouter from "./routes/mocks.routes.js"
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use("/api/products", productsRouter);
app.use('/api/mocks', mocksRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), environment: config.nodeEnv });
});

app.use(errorHandler)

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
});


export default app;
 //server.js --> se encarga inicilizar todas las partes del proyecto --> app - mongoose
 // app.js --> configuracion de app
