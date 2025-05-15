import http from "http";
import fs from "fs";
import path from "path"; // Importar el módulo path
import url from "url";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url || "", true);
  const query = parsedUrl.query;
  const numero = query.numero;

  if (parsedUrl.pathname === "/") {
    // Construir la ruta absoluta al archivo index.html
    const filePath = path.join(__dirname, "index.html");

    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Error al cargar el archivo");
        return;
      } 

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    });
  } else if (parsedUrl.pathname === "/calcular") {
    // Manejar la ruta /calcular
    if (!numero || isNaN(Number(numero))) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Por favor envía un número válido con ?numero=...");
    } else {
      const resultado = Number(numero) * 2;
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`El doble de ${numero} es ${resultado}`);
    }
  } else if (parsedUrl.pathname === "/resultado") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    if (!numero || isNaN(Number(numero))) {
      res.end("Por favor envía un número válido con ?numero=...");
    } else {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Página no encontrada");
    }
  }
});

server.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
