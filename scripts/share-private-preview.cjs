const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..", "dist");
const port = Number(process.argv[2] || 4175);
const password = process.env.MUSIC_PREVIEW_PASSWORD;
const cookieName = "music_preview_session";
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

if (!password) {
  throw new Error("Definí MUSIC_PREVIEW_PASSWORD antes de iniciar la vista privada.");
}

const sessionToken = crypto
  .createHash("sha256")
  .update(`music-importaciones:${password}`)
  .digest("hex");

function renderLogin(hasError = false) {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex,nofollow" />
    <title>Acceso privado | Music Importaciones</title>
    <style>
      * { box-sizing: border-box; }
      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        padding: 24px;
        color: #f8fafc;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        background:
          radial-gradient(circle at 20% 15%, rgba(34, 215, 210, .18), transparent 30%),
          radial-gradient(circle at 85% 80%, rgba(235, 77, 193, .18), transparent 32%),
          #020617;
      }
      main {
        width: min(100%, 420px);
        padding: 34px;
        border: 1px solid rgba(148, 163, 184, .24);
        border-radius: 24px;
        background: rgba(15, 23, 42, .92);
        box-shadow: 0 24px 70px rgba(0, 0, 0, .45);
      }
      .brand {
        margin: 0 0 8px;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: .16em;
        text-transform: uppercase;
        background: linear-gradient(90deg, #b6f338, #22d7d2, #eb4dc1);
        -webkit-background-clip: text;
        color: transparent;
      }
      h1 { margin: 0 0 10px; font-size: 30px; }
      p { margin: 0 0 24px; color: #cbd5e1; line-height: 1.55; }
      label { display: block; margin-bottom: 8px; font-weight: 700; }
      input {
        width: 100%;
        padding: 14px 16px;
        color: #f8fafc;
        border: 1px solid #475569;
        border-radius: 12px;
        outline: none;
        background: #0f172a;
        font: inherit;
      }
      input:focus { border-color: #22d7d2; box-shadow: 0 0 0 3px rgba(34, 215, 210, .2); }
      button {
        width: 100%;
        margin-top: 16px;
        padding: 14px 18px;
        border: 0;
        border-radius: 12px;
        color: #001d31;
        font: inherit;
        font-weight: 900;
        cursor: pointer;
        background: linear-gradient(90deg, #b6f338, #22d7d2);
      }
      .error { margin: 12px 0 0; color: #fda4af; font-weight: 700; }
    </style>
  </head>
  <body>
    <main>
      <p class="brand">Music Importaciones</p>
      <h1>Vista privada</h1>
      <p>Ingresá la contraseña compartida para acceder a la tienda.</p>
      <form method="post" action="/__login">
        <label for="password">Contraseña</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required autofocus />
        <button type="submit">Entrar a la tienda</button>
        ${hasError ? '<p class="error" role="alert">La contraseña es incorrecta.</p>' : ""}
      </form>
    </main>
  </body>
</html>`;
}

function sendLogin(response, hasError = false) {
  response.writeHead(hasError ? 401 : 200, {
    "Cache-Control": "no-store",
    "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'",
    "Content-Type": "text/html; charset=utf-8",
  });
  response.end(renderLogin(hasError));
}

http
  .createServer((request, response) => {
    if (request.method === "POST" && request.url === "/__login") {
      let body = "";

      request.on("data", (chunk) => {
        body += chunk;
        if (body.length > 4096) request.destroy();
      });

      request.on("end", () => {
        const submittedPassword = new URLSearchParams(body).get("password");

        if (submittedPassword !== password) {
          sendLogin(response, true);
          return;
        }

        response.writeHead(303, {
          "Cache-Control": "no-store",
          Location: "/",
          "Set-Cookie": `${cookieName}=${sessionToken}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400`,
        });
        response.end();
      });
      return;
    }

    const cookies = request.headers.cookie || "";
    const isAuthenticated = cookies
      .split(";")
      .map((cookie) => cookie.trim())
      .includes(`${cookieName}=${sessionToken}`);

    if (!isAuthenticated) {
      sendLogin(response);
      return;
    }

    const pathname = decodeURIComponent((request.url || "/").split("?")[0]);
    let filePath = path.resolve(root, `.${pathname}`);

    if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(root, "index.html");
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream",
      });
      response.end(data);
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Vista privada disponible en http://127.0.0.1:${port}`);
  });
