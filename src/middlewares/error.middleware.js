import { EErrors } from '../services/errors/enum.js';

import { logger as defaultLogger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
  // Tomamos el logger inyectado en la request o el importado por defecto
  const log = req?.logger || defaultLogger;

  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
    case EErrors.BAD_REQUEST_ERROR:
      log.warning(`[VALIDATION_ERROR] ${error.name}: ${error.message} - Causa: ${JSON.stringify(error.cause)}`);
      return res.status(400).json({
        status: "error",
        error: error.name || "Validation Error",
        message: error.message,
        cause: error.cause || null,
      });

    case EErrors.NOT_FOUND_ERROR:
    case EErrors.ROUTING_ERROR:
      log.warning(`[NOT_FOUND] ${error.name}: ${error.message}`);
      return res.status(404).json({
        status: "error",
        error: error.name || "Not Found",
        message: error.message,
        cause: error.cause || null,
      });

    case EErrors.DATABASE_ERROR:
      log.error(`[DATABASE_ERROR] ${error.name}: ${error.message} - Stack: ${error.stack}`);
      return res.status(500).json({
        status: "error",
        error: error.name || "Database Error",
        message: error.message,
        cause: error.cause || null,
      });

    default:
      // Error crítico no controlado
      log.fatal(`[UNHANDLED_ERROR] ${error.name || "Error"}: ${error.message} - Stack: ${error.stack}`);
      return res.status(500).json({
        status: "error",
        error: "Unhandled Internal Error",
        message: error.message || "Ocurrió un error inesperado en el servidor",
        cause: null,
      });
  }
};



