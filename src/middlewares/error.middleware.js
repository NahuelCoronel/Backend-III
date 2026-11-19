import { EErrors } from '../services/errors/enum.js';
import { logger as defaultLogger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
  const log = req?.logger || defaultLogger;

  
  if (error.name === 'CastError') {
    log.warning(`[INVALID_ID] Formato de ID inválido: "${error.value}" para el campo "${error.path}"`);
    return res.status(400).json({
      status: "error",
      error: "InvalidIdError",
      message: `El identificador proporcionado ('${error.value}') no tiene un formato válido`,
      cause: null,
    });
  }

  // 2. Errores de validación de esquemas de Mongoose
  if (error.name === 'ValidationError') {
    log.warning(`[SCHEMA_VALIDATION] ${error.message}`);
    return res.status(400).json({
      status: "error",
      error: "ValidationError",
      message: "Los datos enviados no cumplen con el esquema requerido",
      cause: error.message,
    });
  }

  
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
        message: "Error en la capa de datos",
        cause: null,
      });

    default:
      
      log.error(`[INTERNAL_ERROR] ${error.name || "Error"}: ${error.message} - Stack: ${error.stack}`);
      return res.status(500).json({
        status: "error",
        error: "InternalServerError",
        message: "Ocurrió un error inesperado en el servidor",
        cause: null,
      });
  }
};



