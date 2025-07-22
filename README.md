##### culinaryAPI #####

culinaryAPI es una API RESTful construida con Node.js, Express y PostgreSQL para gestionar recetas, usuarios y sus interacciones (likes, saves, reviews, y cocinas asociadas). El proyecto está preparado para ejecutarse fácilmente en Docker.

## Características ##

- Gestión de usuarios (listado).
- Gestión de recetas (listar, buscar por id, buscar por cocina, crear, actualizar, eliminar).
- Asociación de recetas con diferentes cocinas.
- Likes, saves y reviews de usuarios sobre recetas.
- Base de datos inicializada con datos de ejemplo mediante SQL.

#### Estructura del Proyecto ####

1. Endpoints Principales

### Usuarios

- `GET /users`  
  Lista todos los usuarios.

### Recetas

- `GET /recipes`  
  Lista todas las recetas.

- `GET /recipes/:id`  
  Obtiene una receta por su ID.

- `GET /recipes/cuisine/:cuisine`  
  Busca recetas por tipo de cocina.

- `POST /recipes`  
  Crea una nueva receta.

- `PATCH /recipes/:id`  
  Actualiza una receta existente.

- `DELETE /recipes/:id`  
  Elimina una receta.

2. Instalación y Ejecución

### Requisitos

- Docker y Docker Compose instalados.

### Ejecución con Docker

1. Clona el repositorio.
2. Ejecuta el siguiente comando en la raíz del proyecto:

   ```sh
   docker-compose up --watch
3. API estará disponible en http://localhost:3000.

*La base de datos PostgreSQL se inicializa automáticamente con datos de ejemplo definidos en src/config/init.sql*

### Ejecución Local (sin Docker)

1. Instala las dependencias: npm install
2. Configura las variables de entorno en un archivo .env:
```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=recipeApi
DB_PORT=5432
NODE_PORT=3000
```
3. Inicia el servidor: npm start

## Archivos Clave ##

src/server.js: Punto de entrada de la API.
src/config/db.js: Configuración de la conexión a PostgreSQL.
src/config/init.sql: Script de inicialización de la base de datos.
src/controllers/recipes.js: Lógica de recetas.
src/controllers/users.js: Lógica de usuarios.
src/Routes/recipesRoutes.js: Rutas de recetas.
src/Routes/userRoutes.js: Rutas de usuarios.

## Notas
El proyecto utiliza variables de entorno para la configuración de la base de datos y el puerto.
El script SQL crea las tablas y carga datos de ejemplo automáticamente al iniciar el contenedor de la base de datos.
Si no tiene PostgreSQL en su maquina local y quiere ejecutarlo con Docker, debe instalarlo.

Licencia
ISC