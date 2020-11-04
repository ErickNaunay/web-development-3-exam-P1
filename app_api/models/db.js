const mongoose = require("mongoose");
const readLine = require("readline");
require("./users");

//const dbURI = 'mongodb://localhost/mibasededatos'
let dbURI =
  "mongodb+srv://development:W8yFtANZ2humVnv@development-cluster.bn7nu.mongodb.net/storyteller?retryWrites=true&w=majority";
if (process.env.NODE_ENV === "production") {
  dbURI = process.env.MONGODB_URI; // conexion a la DB Remota
}
mongoose.connect(dbURI, { useNewUrlParser: true });

/*
//DB - conexion nombrada
const dbURIlog = 'mongodb://localhost/mibasededatosLog';
const logDB = mongoose.createConnection(dbURIlog);
*/

// Uso de readLine
if (process.platform === "win32") {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on("SIGINT", () => {
    process.emit("SIGINT");
  });
}

// Funcion para cerrar la conexion a la DB
const procShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose desconectado debido a ${msg}`);
    callback();
  });
};

// LLamadas a procShutdown dependiendo de los eventos escuchados
// - windows: SIGINT
process.on("SIGINT", () => {
  procShutdown("terminacion de la app por windows", () => {
    process.exit(0);
  });
});
// - node: SIGUSR2
process.once("SIGUSR2", () => {
  procShutdown("reinicio de nodemon", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});
// - heroku: SIGTERM
process.on("SIGTERM", () => {
  procShutdown("terminacion de la app por heroku", () => {
    process.exit(0);
  });
});

//Monitoreo de eventos a DB 1
//Conexion Mongoose
mongoose.connection.on("connected", () => {
  console.log(`Mongoose se conectó a: ${dbURI}`);
});

//Error de conexión
mongoose.connection.on("error", (err) => {
  console.log("Mongoose error de conexión: ", err);
});

//Desconexión
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose está desconectado");
});
/*
// Monitoreo de eventos a DB2
//DB Conectada
logDB.on('connected', () => {
    console.log(`Mongoose se conectó a: ${dbURIlog}`);
});
// Error de conexion
logDB.on('error', () => {
    console.log("Mongoose error de conexión: ", err);
});
// Desconexion
logDB.on('disconnected', () => {
    console.log("Mongoose está desconectado");
});
*/
