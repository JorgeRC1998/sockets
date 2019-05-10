var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

//Lo que esta en esta carpeta se conecta con sockets al server
//.on es un evento que se activa cuando le llega un mensaje al cliente o al servidor
//enviado por el otro, recibe por un canal
//.emmit es un metodo que envia el mensaje, envia por un canal
app.use(express.static("Client"));

//Establecer la conexion 
io.on("connection", function(socket) {
    console.log("Se conecto alguien");
    socket.emit("Nuevo usuario", "Ya el servidor te escuchó y aceptó tu petición");
    socket.on("registroUsuario", function(nombreUsuario) {
        console.log("Se conecto el usuario " + nombreUsuario);
        socket.emit("respuestaDelServidor", "Bienvenido " + nombreUsuario);
        io.sockets.emit("respuestaDelServidor", "Se ha unido " + nombreUsuario);
    });
});



server.listen(process.env.PORT || 4050, function() {
    console.log('Servidor corriendo en http://localhost:4050');
});