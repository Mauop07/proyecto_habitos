# Proyecto de Gestión de Hábitos Atómicos

Este repositorio contiene la solución completa dividida en Backend y Frontend para la gestión de hábitos basados en el libro *Hábitos Atómicos* (meta de 66 días).

## Estructura del Proyecto
- **/backend**: API REST construida con Node.js, Express y MongoDB Atlas.
- **/frontend**: Aplicación web construida con Next.js, Redux Toolkit y Tailwind CSS.

## Instrucciones de Ejecución

### Requisito previo importante: Configuración de Base de Datos
Para que el backend funcione, es **obligatorio** crear un archivo `.env` en la raíz de la carpeta `/backend` con las siguientes variables:

```env
PORT=5000
MONGO_URI=tu_string_de_conexion_a_mongodb_atlas
