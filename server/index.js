const app = require("./app.js");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/config.env") });
const dbconnection = require("./db/connection");

// dbconnection()


//Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "server/config/config.env" });
}

// calling database
dbconnection();
const server = app.listen(process.env.PORT, () =>
  console.log(`server runing on port ${process.env.PORT}`)
);

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});


