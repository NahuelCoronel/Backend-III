import multer from 'multer';
import { EErrors } from '../services/errors/enum.js';
import { logger as defaultLogger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
  const log = req?.logger || defaultLogger;

  // 1. Errores de casteo de ID de Mongoose
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

  // 3. Errores propios de Multer (límite de tamaño, campos inesperados, etc.)
  if (error instanceof multer.MulterError) {
    let message = 'Error en la carga del archivo';
    if (error.code === 'LIMIT_FILE_SIZE') {
      message = 'El archivo supera el tamaño máximo permitido (5 MB)';
    } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      message = `Campo de archivo inesperado: '${error.field}'`;
    }

    log.warning(`[MULTER_ERROR] ${error.code}: ${message}`);
    return res.status(400).json({
      status: "error",
      error: "MulterError",
      message,
      cause: error.message,
    });
  }

  // 4. Error de tipo de archivo no permitido (lanzado desde el fileFilter de Multer)
  if (error.name === 'InvalidFileTypeError' || error.message?.includes('Tipo de archivo no permitido')) {
    log.warning(`[INVALID_FILE_TYPE] ${error.message}`);
    return res.status(400).json({
      status: "error",
      error: "InvalidFileTypeError",
      message: error.message || "Formato de archivo no permitido. Solo se aceptan PDF, JPEG y PNG.",
      cause: error.cause || null,
    });
  }

  // 5. Manejo según el enum de errores de la aplicación
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
