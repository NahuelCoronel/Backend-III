export const ORDER_STATUS =  Object.freeze({
    CREATED: 'created',
    ASSIGNED: 'assigned',
    PICKED_UP: 'picked_up',
    IN_TRANSIT: 'in_transit',
    DELIVERED :'delivered',
    CANCELLED:'cancelled'
})

export const ORDER_PRIORITY = Object.freeze({
    LOW:'low',
    NORMAL: 'normal',
    HIGH: 'high'
})

export const ROLES = Object.freeze({
  ADMIN: 'admin',
  USER: 'user',
  CUSTOMER: 'customer'
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