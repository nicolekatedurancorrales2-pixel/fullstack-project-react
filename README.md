# TASK MANAGER REACT

El presente proyecto consiste en un administrador de tareas que permite crear, modificar y eliminar tareas. 
Asimismo permite cambiar el estado de cada tarea entre pendiente y completada.

[![CI](https://github.com/nicolekatedurancorrales2-pixel/fullstack-project-react/actions/workflows/ci.yml/badge.svg)](https://github.com/nicolekatedurancorrales2-pixel/fullstack-project-react/actions/workflows/ci.yml)

## 🔗 Instalación local
Ejecute los siguientes comandos para clonar el repositorio, posteriormente ejecute el comando npm run dev
para levantar el proyecto.

```bash
git clone https://github.com/nicolekatedurancorrales2-pixel/fullstack-project-react.git
cd fullstack-project-react
npm install
npm run dev
```

### Variables de entorno

Crea un archivo `.env` en la raíz con las siguientes claves:

La variable VITE_API_URL se configura para tener una conexión con el backend desplegado en la nube,
es decir el valor que se configura en esta variable es la url del backend en la nube.q

```env
VITE_API_URL=https://fullstack-project-react-k16vx.onrender.com
```

## 📋 Comandos disponibles

| Comando           | Descripción                                      |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Levanta el entorno de desarrollo                 |
| `npm run build`   | Genera el build de producción                    |
| `npm test`        | Corre las pruebas automatizadas (pendiente – Sesión 3) |

## 🗄️ Base de datos

PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).