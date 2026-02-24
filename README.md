# Proyecto de Gestión de Hábitos - Semana 1

Este proyecto es una API construida con Node.js y Express para la gestión de hábitos, utilizando MongoDB Atlas como base de datos.

## Requisitos
- Node.js instalado
- Cuenta en MongoDB Atlas

## Instalación y Ejecución
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Crear un archivo `.env` en la raíz con la variable `MONGO_URI` (Ver ejemplo en el código).
4. Ejecutar el comando `node index.js` para iniciar el servidor.

## Endpoints
- **POST /api/habitos**: Crear un nuevo hábito.
- **GET /api/habitos**: Obtener todos los hábitos.
- **PUT /api/habitos/:id**: Actualizar un hábito.
- **DELETE /api/habitos/:id**: Eliminar un hábito.