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


## Logging y Monitoreo con Winston

Se implementó un sistema de logging estructurado y centralizado para ShipNow API utilizando Winston y winston-daily-rotate-file, reemplazando el uso de console.log y conectándose con la arquitectura en capas y el middleware global de errores.

### 1. Niveles de log configurados
El sistema cuenta con una escala de prioridades personalizada y colores en consola:
- fatal (prioridad 0): Fallas críticas que comprometen la continuidad del servicio o errores internos no controlados.
- error (prioridad 1): Errores de base de datos o excepciones operativas graves.
- warning (prioridad 2): Validaciones fallidas de datos y rutas no encontradas (404).
- info (prioridad 3): Registro del inicio del servidor, conexión a base de datos y eventos generales del ciclo de vida.
- http (prioridad 4): Registro de cada petición HTTP entrante con método, ruta y hora.
- debug (prioridad 5): Diagnóstico detallado para desarrollo.

### 2. Comportamiento según el entorno
El logger detecta la variable NODE_ENV:
- Entorno de Desarrollo (NODE_ENV=development): Muestra por consola todos los niveles (desde debug hasta fatal) con formato legible y colores.
- Entorno de Producción (NODE_ENV=production): Muestra por consola a partir del nivel info. Persiste automáticamente los niveles error y fatal en archivos rotativos dentro de la carpeta /logs.

### 3. Persistencia y rotación de archivos
Para el entorno productivo se implementó un transporte DailyRotateFile:
- Directorio de almacenamiento: /logs
- Patrón de archivo: errors-YYYY-MM-DD.log
- Tamaño máximo por archivo: 20 MB
- Retención máxima: 14 días

### 4. Endpoint de prueba
Para verificar el funcionamiento del logger y sus diferentes niveles, se dispone del siguiente endpoint:
- Método: GET
- Ruta: /api/loggerTest
- Respuesta: Dispara logs de prueba en los seis niveles configurados y responde un JSON de confirmación.

### 5. Cómo probar los entornos
1. En el archivo .env, definir:
   NODE_ENV=development
2. Iniciar el servidor y realizar una petición GET a http://localhost:8080/api/loggerTest para visualizar todos los niveles coloreados en la consola.
3. Modificar en el .env:
   NODE_ENV=production
4. Reiniciar el servidor y repetir la petición para comprobar que en consola solo se emiten mensajes desde info y que se genera el archivo en /logs con los registros de error y fatal.


## Documentación de la API con Swagger

La API cuenta con documentación interactiva generada con OpenAPI 3.0 y Swagger UI.

### Acceso
Una vez iniciado el servidor, podés acceder a la interfaz interactiva desde tu navegador en:
- `http://localhost:8080/api/docs`

### Módulos documentados
La documentación se organiza bajo 5 tags principales:
1. **Users:** Operaciones CRUD sobre usuarios (`/api/users`).
2. **Orders:** Creación y consulta de pedidos (`/api/orders`), validando items y montos.
3. **Deliveries:** Registro y seguimiento logístico (`/api/deliveries`).
4. **Mocks:** Generación en memoria (`GET /api/mocks/users`, `GET /api/mocks/products`) y persistencia con carga masiva (`POST /api/mocks/seed`).
5. **Logger:** Endpoint de diagnóstico técnico (`GET /api/loggerTest`) para validar los niveles de registro de Winston en consola y archivos rotativos.

### Cómo probar los endpoints
1. Levantar el entorno con `npm run dev` (o `npm start`).
2. Ingresar a `http://localhost:8080/api/docs`.
3. Desplegar cualquier endpoint y presionar el botón **"Try it out"**.
4. Completar los parámetros o el body según el schema indicado y presionar **"Execute"**.


## 🧪 Testing y Validación Funcional

El proyecto cuenta con una suite completa de pruebas funcionales automatizadas sobre la API REST.

### Herramientas utilizadas
- **Mocha**: Test runner y organización de suites.
- **Chai**: Librería de aserciones (`expect`).
- **Supertest**: Cliente HTTP para tests de integración sobre endpoints.

### Módulos testeados
1. **Documentación Swagger (`/api/docs`)**:
   - Disponibilidad y renderizado de la UI de Swagger (código `200` o redirección).
   - Manejo de rutas inexistentes (`404`).
2. **Logger y Diagnóstico (`/api/loggerTest`)**:
   - Verificación de niveles de logs (`DEBUG`, `HTTP`, `INFO`, `WARNING`, `ERROR`, `FATAL`).
3. **Mocks y Seeding (`/api/mocks`)**:
   - Generación de usuarios y productos simulados en memoria (`200`).
   - Validación y manejo de errores con `qty` inválido (`400`).
   - Persistencia de datos mockeados en base de datos (`201`).
4. **Órdenes (`/api/orders`)**:
   - Listado de órdenes (`200`).
   - Creación exitosa de órdenes (`201`).
   - Validación de esquema y campos obligatorios (`400`).
   - Búsqueda de órdenes inexistentes (`404`).
5. **Usuarios (`/api/users`)**:
   - Listado de usuarios (`200`).
   - Registro y creación de usuario (`201`).
   - Validación ante datos incompletos (`400`).
   - Manejo de usuario no encontrado (`404`).

### Ejecución de los tests
Para correr la suite completa de pruebas:

```bash
npm test


## Módulo 7: Carga de Archivos, Documentos y Comprobantes (Multer)

### 📌 Nuevos Endpoints

#### 1. Carga de Documentos de Usuario
* **Método:** `POST`
* **Ruta:** `/api/users/:uid/documents`
* **Content-Type:** `multipart/form-data`
* **Campos del Formulario:**
  * `documents`: Archivo a subir (PDF, imágenes, etc.).
  * `documentType` *(opcional / requerido según validación)*: Tipo de documento (`identification`, `address_proof`, `account_statement`, `profile`, `product`).
* **Respuesta Exitosa (200):** Devuelve el usuario con el array de metadatos de documentos actualizado.

#### 2. Carga de Comprobante de Entrega en Órdenes
* **Método:** `POST`
* **Ruta:** `/api/orders/:oid/receipt`
* **Content-Type:** `multipart/form-data`
* **Campos del Formulario:**
  * `receipt`: Archivo comprobante de la orden.
* **Respuesta Exitosa (200):** Devuelve la orden con los metadatos del comprobante vinculados.

---

### 📂 Almacenamiento y Metadatos
* **Multer Centralizado:** Configuración desacoplada en middleware (`src/middlewares/multer.middleware.js` o `src/config/multer.js`), gestionando extensiones permitidas, límites de tamaño y nombres únicos con timestamp.
* **Carpetas de destino:** `uploads/documents/` y `uploads/receipts/` (ignoradas en `.gitignore`).
* **Persistencia en MongoDB:** Se almacenan únicamente metadatos (`originalName`, `filename`, `path`, `mimetype`, `size`, `documentType`, `uploadedAt`), manteniendo la base ligera.

---

### 🧪 Ejecución de Pruebas Funcionales
Para ejecutar la suite completa de tests funcionales (Mocha, Supertest y Chai):

```bash
npm test

