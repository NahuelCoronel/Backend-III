
## 🚀 Instrucciones para correr el proyecto localmente
1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd <NOMBRE_DE_LA_CARPETA>

Instalar dependencias.


Configurar variables de entorno: Crear un archivo .env en la raíz tomando como base .env.example:


Completar los valores en .env.


Iniciar la aplicación.



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