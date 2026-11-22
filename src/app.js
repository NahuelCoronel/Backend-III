import express from 'express';
import cors from 'cors';
import config from './config/env.config.js';
import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";
import mocksRouter from "./routes/mocks.routes.js";
import loggerTestRouter from "./routes/loggerTest.routes.js";
import ordersRouter from "./routes/orders.router.js"
import deliveriesRouter from "./routes/deliveries.router.js"
import { errorHandler } from './middlewares/error.middleware.js';
import { addLogger } from "./middlewares/logger.middleware.js";
import { serveSwagger, setupSwagger } from './config/swagger.config.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addLogger);

app.use('/api/docs', serveSwagger, setupSwagger);

app.use('/api/users', usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/deliveries", deliveriesRouter)
app.use('/api/mocks', mocksRouter);
app.use("/api", loggerTestRouter);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv || process.env.NODE_ENV || 'development'
  });
});



app.use((req, res) => {
  req.logger.warning(`Ruta no encontrada (404) - ${req.method} ${req.originalUrl}`);
  res.status(404).json({ status: 'error', message: `Ruta ${req.originalUrl} no encontrada` });
});


app.use(errorHandler);

export default app;
