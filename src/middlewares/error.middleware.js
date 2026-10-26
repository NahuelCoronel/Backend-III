import { EErrors } from '../services/errors/enum.js';

export const errorHandler = (error, req, res, next) => {
  // Verificamos si el error viene de nuestro diccionario
  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
    case EErrors.BAD_REQUEST_ERROR:
      return res.status(400).json({
        status: 'error',
        error: error.name || 'Validation Error',
        message: error.message,
        cause: error.cause || null
      });

    case EErrors.NOT_FOUND_ERROR:
      return res.status(404).json({
        status: 'error',
        error: error.name || 'Not Found',
        message: error.message,
        cause: error.cause || null
      });

    case EErrors.DATABASE_ERROR:
      return res.status(500).json({
        status: 'error',
        error: error.name || 'Database Error',
        message: error.message,
        cause: error.cause || null
      });

    case EErrors.ROUTING_ERROR:
      return res.status(404).json({
        status: 'error',
        error: error.name || 'Routing Error',
        message: error.message,
        cause: error.cause || null
      });

    default:
      // Cualquier error no controlado o nativo de JavaScript
      return res.status(500).json({
        status: 'error',
        error: 'Unhandled Internal Error',
        message: error.message || 'Ocurrió un error inesperado en el servidor',
        cause: null
      });
  }
};
