export const generateMockQtyErrorInfo = (qty) => {
  return `La cantidad solicitada debe ser un número entero mayor a 0. Se recibió: ${qty}`;
};

export const generateUserNotFoundErrorInfo = (userId) => {
  return `No se encontró ningún usuario con el ID: ${userId}`;
};

export const generateOrderNotFoundErrorInfo = (orderId) => {
  return `No se encontró la orden con el ID: ${orderId}`;
};


export const generateProductNotFoundErrorInfo = (id) => {
  return `No se encontró ningún producto registrado con el identificador: ${id}`;
};

export const generateProductCreationErrorInfo = ({ name, description, price, stock }) => {
  return `Uno o más campos obligatorios no fueron completados o tienen tipos inválidos:
  * name        : Esperado String, recibido ${name ? typeof name : 'undefined'} (${name})
  * description : Esperado String, recibido ${description ? typeof description : 'undefined'} (${description})
  * price       : Esperado Number (>= 0), recibido ${price !== undefined ? typeof price : 'undefined'} (${price})
  * stock       : Esperado Number (>= 0), recibido ${stock !== undefined ? typeof stock : 'undefined'} (${stock})`;
};

export const generateProductNumericValidationErrorInfo = (field, value) => {
  return `El campo "${field}" debe ser un número mayor o igual a 0. Se recibió: ${value}`;
};



export const generateUserCreationErrorInfo = ({ firstName, lastName, email, password }) => {
  return `Uno o más campos obligatorios no fueron completados o tienen tipos inválidos:
  * firstName : Esperado String, recibido ${firstName ? typeof firstName : 'undefined'} (${firstName})
  * lastName  : Esperado String, recibido ${lastName ? typeof lastName : 'undefined'} (${lastName})
  * email     : Esperado String, recibido ${email ? typeof email : 'undefined'} (${email})
  * password  : Esperado String, recibido ${password ? typeof password : 'undefined'}`;
};

export const generateUserEmailConflictErrorInfo = (email) => {
  return `El correo electrónico "${email}" ya está registrado en el sistema. Debe ser único.`;
};

export const generateUserForbiddenRoleErrorInfo = () => {
  return 'No posee los privilegios necesarios para autoasignar o promover al rol ADMIN mediante esta operación.';
};
