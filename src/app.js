import express from 'express';
import cors from 'cors';
import config from './config/env.config.js';
import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use("/api/products", productsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), environment: config.nodeEnv });
});

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
});


export default app;
 //server.js --> se encarga inicilizar todas las partes del proyecto --> app - mongoose
 // app.js --> configuracion de app
