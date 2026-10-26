ShipNow API
API profesional para gestión de envíos desarrollada en Node.js + Express + MongoDB, respetando la arquitectura en capas (Controller -> Service -> Repository).

Repositorio
https://github.com/NahuelCoronel/Backend-III

Tecnologías
Node.js

Express

MongoDB + Mongoose

Arquitectura por capas (Controllers, Services, Repositories)

Variables de entorno centralizadas

Manejo centralizado y profesional de errores

Faker (Mocks de datos de prueba)

Instalación
Clonar el repositorio e instalar dependencias:

git clone https://github.com/NahuelCoronel/Backend-III.git

cd Backend-III

npm install

Configuración
Renombrar el archivo .env.example a .env y completar las variables:

PORT=8080

MONGODB_URI=url_de_tu_base_mongodb

NODE_ENV=development

Ejecución
Modo desarrollo (con nodemon):

npm run dev

Modo producción:

npm start

El servidor quedará escuchando en http://localhost:8080.

Justificación de la separación entre Service y Repository
La separación en capas responde al principio de responsabilidad única (SRP) y al bajo acoplamiento:

Repository (Capa de Acceso a Datos): Su única responsabilidad es comunicarse con la base de datos (Mongoose / MongoDB). Encapsula las consultas (find, create, update, delete). Si en el futuro se cambia de base de datos o de ODM, solo se modifica esta capa sin afectar el resto de la aplicación.

Service (Capa de Lógica de Negocio): Contiene las reglas del dominio (validación de duplicados, restricciones de roles, cálculo de stock). No tiene conocimiento de Mongoose ni de HTTP (req, res); consume los métodos del Repository y lanza errores de negocio con CustomError.

Sistema Centralizado de Manejo de Errores
El proyecto implementa un patrón estandarizado para la captura y respuesta de excepciones:

CustomError: Fábrica que construye instancias de error con nombre, causa y código numérico (EErrors).

EErrors: Diccionario de enumeración de códigos de error (ROUTING_ERROR, INVALID_TYPES_ERROR, NOT_FOUND_ERROR, BAD_REQUEST_ERROR).

errorHandler Middleware: Middleware final de Express que intercepta todos los errores derivados con next(error) y devuelve una respuesta uniforme.

Estructura de respuesta de error unificada:

status: "error"

error: Nombre del error (por ejemplo, ProductNotFoundError)

message: Descripción corta del problema

cause: Detalle técnico o campos faltantes

Endpoints Principales y Casos de Prueba
1. Productos (/api/products)
GET /api/products - Listar todos los productos (200 OK).

GET /api/products/:id - Obtener producto por ID (200 OK).

Prueba 404 (Not Found): GET /api/products/65a1b2c3d4e5f6a7b8c9d0e1 (ObjectId válido inexistente).
POST /api/products - Crear producto.

Prueba 400 (Bad Request): POST /api/products enviando body incompleto {"title": "Teclado"}.
PUT /api/products/:id - Actualizar producto.

DELETE /api/products/:id - Eliminar producto.

2. Usuarios (/api/users)
GET /api/users - Listar todos los usuarios (200 OK).

GET /api/users/:id - Obtener usuario por ID (200 OK).

Prueba 404 (Not Found): GET /api/users/65a1b2c3d4e5f6a7b8c9d0e2 (ObjectId inexistente).
POST /api/users - Registrar usuario.

Prueba 400 (Bad Request): POST /api/users enviando body vacío {}.
PUT /api/users/:id - Actualizar usuario.

DELETE /api/users/:id - Eliminar usuario.

3. Mocks y Pruebas (/api/mocks)
GET /api/mocks/users?qty=5 - Generar 5 usuarios simulados en memoria (200 OK).

GET /api/mocks/products?qty=10 - Generar 10 productos simulados en memoria (200 OK).

POST /api/mocks/seed?qty=10 - Poblar la base de datos con registros relacionales (201 Created).

Prueba 400 (Mocks con parámetro inválido): GET /api/mocks/users?qty=-5 o qty=abc dispara InvalidQuantityError con código 400.