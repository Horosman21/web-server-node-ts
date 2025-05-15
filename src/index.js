"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var url_1 = require("url");
// Crear el servidor
var server = http.createServer(function (req, res) {
    // Verificar si la URL está presente
    if (!req.url) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Solicitud inválida: falta la URL");
        return;
    }
    try {
        // Parsear la URL
        var url = new url_1.URL(req.url, "http://".concat(req.headers.host));
        var numero = parseFloat(url.searchParams.get("numero"));
        res.writeHead(200, { "Content-Type": "text/plain" });
        // Verificar si el parámetro es un número válido
        if (!isNaN(numero)) {
            var resultado = numero * 2;
            res.end("El doble de ".concat(numero, " es ").concat(resultado));
        }
        else {
            res.end("Por favor envía un número válido con ?numero=...");
        }
    }
    catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error interno del servidor");
    }
});
// Iniciar el servidor en el puerto 3000
server.listen(3000, function () {
    console.log("Servidor web corriendo en http://localhost:3000");
});
