# Proyecto de Gestión de Hábitos Atómicos (Semana 5)

Este repositorio contiene la solución completa dividida en Backend y Frontend para la gestión de hábitos basados en el libro *Hábitos Atómicos* (meta de 66 días).

## Estructura del Proyecto
- **/backend**: API REST construida con Node.js, Express y MongoDB Atlas.
- **/frontend**: Aplicación web construida con Next.js, Redux Toolkit y Tailwind CSS.

## Instrucciones de Ejecución

### 1. Configuración de Base de Datos (.env)
Es **obligatorio** crear un archivo `.env` en la raíz de la carpeta `/backend` con las siguientes variables:

```env
PORT=5000
MONGO_URI=tu_string_de_conexion_a_mongodb_atlas
JWT_SECRET=tu_clave_secreta_jwt
```

### 2. Instalación y Arranque

**Backend:**
```bash
cd backend
npm install
node index.js
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Cambios Clave Semana 5
- **Seguridad:** Autenticación con JWT y contraseñas encriptadas (Bcrypt).
- **Lógica de Racha:** Reinicio automático a 0 si pasan más de 24 horas sin completar el hábito.
- **Persistencia:** Gestión de sesión con Redux y LocalStorage.
- **Fix:** Solucionado error de hidratación en Next.js.