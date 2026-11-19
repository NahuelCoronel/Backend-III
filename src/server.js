import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/env.config.js";
import { logger } from "./utils/logger.js";

async function startServer() {
  try {
    await mongoose.connect(config.mongodbUri);
    logger.info("Base de datos conectada");

    app.listen(config.port, () => {
      logger.info(`Servidor iniciado en el puerto ${config.port}`);
      logger.info(`Entorno: ${config.nodeEnv}`);
    });
  } catch (error) {
    logger.fatal(`Error crítico al iniciar el servidor: ${error.message} - Stack: ${error.stack}`);
    process.exit(1);
  }
}

startServer();
