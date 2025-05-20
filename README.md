# SnippetLab

**SnippetLab** es una plataforma todo‑en‑uno para crear, compartir y organizar fragmentos de código de forma colaborativa. Además incluye generación de snippets por IA, versionado, colecciones, foro Q\&A con soporte Markdown y todas las herramientas sociales que un desarrollador necesita. Uniendo la base de conocimiento personal con la comunidad.

## 🌍 Demo en vivo

Accede a la versión desplegada en Vercel: [https://snippetlab.app/](https://snippetlab.app/)

---

## 📄 Descripción

SnippetLab facilita la gestión de snippets con:

- **Editor Monaco** integrado con resaltado de sintaxis y botón de “copiar al portapapeles”.
- **Generación de snippets con IA** describiendo lo que necesites (“Create a debounce function in JS”).
- **Versionado automático**: historial completo de ediciones, diffs visuales y botón _Revert_ para restaurar versiones previas.
- **Comentarios en snippets**: conversación directa bajo cada fragmento.
- **Fork de snippets**: clona el código de otro usuario en tu cuenta con un clic y genera tu propia versión.
- **Colecciones públicas/privadas** para organizar snippets por temática, con botón para compartir.
- **Feed social** y sistema de follows/likes para descubrir y apoyar a otros desarrolladores.
- **Foro Q\&A** ligero en contexto de cada snippet, con soporte completo de **Markdown** para preguntas y respuestas.
- **Página de explorar**: descubre usuarios y snippets filtrados por lenguaje, título y etiquetas.
- **Navegación global y búsqueda** utilizando cmdk.
- **CLI de SnippetLab**: descarga cualquier snippet público desde tu terminal con un solo comando.

---

## 🔐 Integración y uso de Clerk

- Inicio de sesión y registro seguros con **email/password**, **Google** y **GitHub**.
- Formularios de login y signup totalmente personalizados usando **Clerk Elements**.
- **Webhooks** de Clerk para sincronizar datos de usuario (nombre, avatar, metadatos) en la base de datos.

---

## 🚀 Características principales

| Funcionalidad                             | Detalles                                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Crear/editar/borrar snippets**          | Editor Monaco, copiar código, IA, comentarios editables y notificaciones.                               |
| **Versionado de código**                  | Historial de versiones, diffs encadenados y botón _Revert_ para restaurar.                              |
| **Fork de snippets**                      | Duplicado instantáneo del snippet original en tu cuenta para modificar.                                 |
| **Colecciones**                           | CRUD completo, asignación múltiple y compartir con enlaces directos.                                    |
| **Feed social**                           | Sigue a usuarios, crea tu feed personalizado y explora lo más reciente.                                 |
| **Likes & bookmarks**                     | Marca tus favoritos y accede a ellos desde tu perfil.                                                   |
| **Foro Q\&A con Markdown**                | Plantea y responde preguntas con snippets embebidos, usa Markdown para formateo rico.                   |
| **Descubrimiento de usuarios y snippets** | Descubre nuevos snippets y filtra por lenguaje, tags o título en la página _Explore_                    |
| **Compartir y CLI**                       | Comparte la URL de un snippet o colección o descárgalo directamente en tu proyecto con un solo comando. |

---

## 💻 SnippetLab CLI

Además de la interfaz web, tienes disponible una **herramienta de línea de comandos** para descargar cualquier snippet público directamente desde tu terminal.

### 📥 Instalación

Instala el CLI de forma global con npm o pnpm:

```bash
npm install -g snippetlab
# o
pnpm add -g snippetlab
```

### 🚀 Uso

En la web, cada snippet público incluye un botón “Compartir” con el comando listo para copiar:

```bash
snippetlab add <usuario/slug> [ruta-de-salida]
```

### Ejemplos

```bash
# Descargar y usar el nombre de archivo que viene en la API
snippetlab add aaron/usetoggle-hook

# Descargar y escribir en code/index.ts (crea el directorio si hace falta)
snippetlab add aaron/usetoggle-hook code/index.ts

# Descargar y volcar raw por stdout
snippetlab add aaron/usetoggle-hook > snippet.js
```

### 🔗 Repositorio

Todo el código del CLI está en [https://github.com/aaronperezaguilera/snippetlab-cli](https://github.com/aaronperezaguilera/snippetlab-cli)

---

## 🛠 Tecnologías usadas

- **Next.js** – Framework React full‑stack.
- **React** – UI declarativa.
- **Tailwind CSS** – Estilos modernos y responsivos.
- **Clerk** – Autenticación, protección de rutas y gestión de usuarios.
- **Neon + Drizzle ORM** – Base de datos PostgreSQL y generación de migrations.
- **Monaco Editor** – Editor de código embebido.
- **Lucide Icons** – Iconos ligeros.
- **cmdk** - Navegación y búsqueda global.

---

## ⚙️ Instalación local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/aaronperezaguilera/snippetlab.git
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

## Contribuir
1. Fork el repositorio.
2. Crea una rama: git checkout -b feat/my-feature.
3. Confirma tus cambios: git commit -m "feat: add my feature".
4. Haz push de tu fork: git push origin feat/my-feature.
5. Abre una pull request.

---

## 📸 Capturas

<img width="2553" alt="Screenshot 2025-05-20 at 20 59 04" src="https://github.com/user-attachments/assets/1dc55acd-5f13-4ed8-a420-aa1720a76ba2" />
<img width="2553" alt="Screenshot 2025-05-20 at 20 59 46" src="https://github.com/user-attachments/assets/68a34334-1d98-42fb-b919-88352014b269" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 06 52" src="https://github.com/user-attachments/assets/babc1e2e-9450-4c9e-a40c-8afaf81eaac1" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 06 58" src="https://github.com/user-attachments/assets/5797296b-b9a3-4943-b9c6-210e84ddecfc" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 07 03" src="https://github.com/user-attachments/assets/fc05afc0-e667-4e52-b3ee-ca9aa2267551" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 07 28" src="https://github.com/user-attachments/assets/65187994-6ea9-4d8d-9361-11a4755942ba" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 07 33" src="https://github.com/user-attachments/assets/5e0a0f16-190a-421d-b207-e52d2ed0298b" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 04 02" src="https://github.com/user-attachments/assets/4e3b70b4-e372-46d4-a1f7-ef9689ba0ca5" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 05 29" src="https://github.com/user-attachments/assets/d8a20eef-2da0-4bcd-a107-8bbe5d4deea9" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 05 10" src="https://github.com/user-attachments/assets/b6eece69-812b-44fc-b50f-b146966e14de" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 05 20" src="https://github.com/user-attachments/assets/2a72b717-df57-43ac-915f-5c5f2906626f" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 05 55" src="https://github.com/user-attachments/assets/7e5eacb1-89c6-410f-a916-71501f9e4146" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 05 40" src="https://github.com/user-attachments/assets/916ae348-9fec-4ad3-ad4d-4c572174aabc" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 05 49" src="https://github.com/user-attachments/assets/72688c9f-7e06-440b-8665-9a848d0c5ce2" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 06 26" src="https://github.com/user-attachments/assets/70b9264b-a9be-4c29-a23e-13e8b29f6b6f" />
<img width="2553" alt="Screenshot 2025-05-20 at 21 07 45" src="https://github.com/user-attachments/assets/20850c71-551f-48e0-9b03-1072cc023c76" />

---

Hecho con ❤️ para la [Hackatón de Midudev y Clerk de 2025](<[https://snippetlab.vercel.app](https://github.com/midudev/hackaton-clerk-2025)>)
