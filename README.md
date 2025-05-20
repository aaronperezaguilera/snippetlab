# SnippetLab

**SnippetLab** es una plataforma todo‑en‑uno para crear, compartir y organizar fragmentos de código de forma colaborativa. Además incluye generación de snippets por IA, versionado, colecciones, foro Q\&A con soporte Markdown y todas las herramientas sociales que un desarrollador necesita. Uniendo la base de conocimiento personal con la comunidad.

---

## 🌍 Demo en vivo

Accede a la versión desplegada en Vercel: [https://snippetlab.vercel.app](https://snippetlab.vercel.app)

## 📦 Repositorio

Clona o explora el proyecto en GitHub: [https://github.com/tu-usuario/snippetlab](https://github.com/tu-usuario/snippetlab)

---

## 📄 Descripción

SnippetLab facilita la gestión de snippets con:

* **Editor Monaco** integrado con resaltado de sintaxis y botón de “copiar al portapapeles”.
* **Generación de snippets con IA** describiendo lo que necesites (“Create a debounce function in JS”).
* **Versionado automático**: historial completo de ediciones, diffs visuales y botón *Revert* para restaurar versiones previas.
* **Comentarios en snippets**: conversación directa bajo cada fragmento.
* **Fork de snippets**: clona el código de otro usuario en tu cuenta con un clic y genera tu propia versión.
* **Colecciones públicas/privadas** para organizar snippets por temática, con botón para compartir.
* **Feed social** y sistema de follows/likes para descubrir y apoyar a otros desarrolladores.
* **Foro Q\&A** ligero en contexto de cada snippet, con soporte completo de **Markdown** para preguntas y respuestas.
* **Página de explorar**: descubre usuarios y snippets filtrados por lenguaje, título y etiquetas.
* **Navegación global y búsqueda** utilizando cmdk.

---

## 🔐 Integración y uso de Clerk

* Inicio de sesión y registro seguros con **email/password**, **Google** y **GitHub**.
* Formularios de login y signup totalmente personalizados usando **Clerk Elements**.
* **Webhooks** de Clerk para sincronizar datos de usuario (nombre, avatar, metadatos) en la base de datos.

---

## 🚀 Características principales

| Funcionalidad                    | Detalles                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| **Crear/editar/borrar snippets** | Editor Monaco, copiar código, IA, comentarios editables y notificaciones.             |
| **Versionado de código**         | Historial de versiones, diffs encadenados y botón *Revert* para restaurar.            |
| **Fork de snippets**             | Duplicado instantáneo del snippet original en tu cuenta para modificar.               |
| **Colecciones**                  | CRUD completo, asignación múltiple y compartir con enlaces directos.                  |
| **Feed social**                  | Sigue a usuarios, crea tu feed personalizado y explora lo más reciente.               |
| **Likes & bookmarks**            | Marca tus favoritos y accede a ellos desde tu perfil.                                 |
| **Foro Q\&A con Markdown**       | Plantea y responde preguntas con snippets embebidos, usa Markdown para formateo rico. |
| **Descubrimiento de usuarios y snippets**       | Descubre nuevos snippets y filtra por lenguaje, tags o título en la página _Explore_ |

---

## 🛠 Tecnologías usadas

* **Next.js** – Framework React full‑stack.
* **React** – UI declarativa.
* **Tailwind CSS** – Estilos modernos y responsivos.
* **Clerk** – Autenticación, protección de rutas y gestión de usuarios.
* **Neon + Drizzle ORM** – Base de datos PostgreSQL y generación de migrations.
* **Monaco Editor** – Editor de código embebido.
* **Lucide Icons** – Iconos ligeros.
* **cmdk** - Navegación y búsqueda global.

---

## ⚙️ Instalación local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/snippetlab.git
   ```
2. Entra en el directorio e instala dependencias con pnpm:

   ```bash
   cd snippetlab
   pnpm install
   ```
3. Crea tu archivo de entorno copiando:

   ```bash
   cp .env.example .env.local
   ```

   y rellena las variables necesarias.
4. Genera tipos y migraciones de Drizzle:

   ```bash
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```
5. Ejecuta en modo desarrollo:

   ```bash
   pnpm dev
   ```

---

## 📸 Capturas

Hecho con ❤️
