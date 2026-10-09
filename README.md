Buenas tardes, tome lo hecho en clase pero después me pareció mejor empezar de cero. Ahora borre todo lo que hizo el profesor en clase y deje todo lo hecho por mí. Le presté atención a las correciones que me marcaron. Estoy atento a si hace falta algo más. También tengo la duda de si hay que cumplir si o si con lo hecho en clase o esta bien el camino que estoy tomando de crear todo de cero.

# ShipNow API
API profesional para gestión de envíos desarrollada en Node.js + Express + MongoDB, respetando la arquitectura en capas (Controller → Service → Repository).
## 🔗 Repositorio
[https://github.com/NahuelCoronel/Backend-III]

## 🚀 Tecnologías
- Node.js
- Express
- MongoDB + Mongoose
- Arquitectura por capas (Controllers, Services, Repositories)
- Variables de entorno centralizadas
- Manejo de errores profesional

## 📦 Instalación
Clonar el repositorio e instalar dependencias:
```bash
git clone https://github.com/NahuelCoronel/Backend-III.git
cd "ruta del proyecto"
npm install

⚙️ Configuración
Renombrar el archivo .env.example a .env y completar las variables:


PORT=8080
MONGODB_URI="url de la base"
NODE_ENV=development

▶️ Ejecución
Modo desarrollo (con nodemon):

npm run dev

Modo producción:

npm start

El servidor quedará escuchando en http://localhost:8080.


🏛️ Justificación de la separación entre Service y Repository
La separación en capas responde al principio de responsabilidad única (SRP) y al bajo acoplamiento:

Repository (Capa de Acceso a Datos):

Su única responsabilidad es comunicarse con la base de datos (Mongoose / MongoDB).
Encapsula las consultas (find, create, update, delete).
Si en el futuro se cambia de base de datos o de ORM/ODM, solo se modifica esta capa sin afectar el resto de la aplicación.
Service (Capa de Lógica de Negocio):

Contiene las reglas del dominio (por ejemplo: validación de duplicados, restricciones de roles o verificación de stock).
No tiene conocimiento de Mongoose ni de la base de datos; solo consume los métodos del Repository.
Tampoco conoce el protocolo HTTP (req, res), lo que permite que la lógica sea reutilizable y fácil de testear de forma aislada.
📌 Endpoints principales
Productos:

GET /api/products - Listar productos
GET /api/products/:id - Obtener producto por ID
POST /api/products - Crear producto
PUT /api/products/:id - Actualizar producto
DELETE /api/products/:id - Eliminar producto
Usuarios:

GET /api/users - Listar usuarios
GET /api/users/:id - Obtener usuario por ID
POST /api/users - Registrar usuario
PUT /api/users/:id - Actualizar usuario
DELETE /api/users/:id - Eliminar usuario