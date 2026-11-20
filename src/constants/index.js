

export const ROLES = Object.freeze({
  ADMIN: 'admin',
  USER: 'user',
  CUSTOMER: 'cliente',
  DRIVER: "repartidor"
});

export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
});

export const PRODUCT_STATUS = Object.freeze({
    AVAILABLE : "available",
    OUT_OF_STOCK : "out_of_stock"

})

export const ORDER_STATUS = Object.freeze({
  PENDING: 'pendiente',
  IN_PROGRESS: 'en_camino',
  DELIVERED: 'entregado',
  CANCELLED: 'cancelado'
});
export const ORDER_PRIORITY = Object.freeze({
  LOW: 'baja',
  MEDIUM: 'media',
  HIGH: 'alta'
});
export const DELIVERY_STATUS = Object.freeze({
  ASSIGNED: 'asignado',
  IN_TRANSIT: 'en_transito',
  COMPLETED: 'completado',
  FAILED: 'fallido'
});

// Tipos de documentos permitidos para usuarios / operaciones
export const DOCUMENT_TYPES = {
  IDENTIFICATION: 'identification',
  DRIVERS_LICENSE: 'drivers_license',
  PROOF_OF_ADDRESS: 'proof_of_address',
  DELIVERY_RECEIPT: 'delivery_receipt'
};

// Sumar a tu enum o diccionario EErrors si no los tenés:
export const EErrors = {
  // ... los que ya tenías (ROUTING_ERROR, INVALID_TYPES_ERROR, DATABASE_ERROR, etc.)
  FILE_REQUIRED_ERROR: 'FILE_REQUIRED_ERROR',
  INVALID_FILE_TYPE_ERROR: 'INVALID_FILE_TYPE_ERROR',
  FILE_SIZE_LIMIT_ERROR: 'FILE_SIZE_LIMIT_ERROR',
  INVALID_DOCUMENT_TYPE_ERROR: 'INVALID_DOCUMENT_TYPE_ERROR'
};
