const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const mongoDBConnect = require("connect-mongodb-session")(session);
// const tempEmployee = require("./routers/tempEmployeeRouting");
const dotenv = require("dotenv");
const {startApolloServer} = require("./graphql/graphql")
dotenv.config({ path: "backend/config/config.env" });


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


    


startApolloServer(app)

module.exports = app;
