import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api"
require("dotenv").config();
import connection from './config/connectDB'
import configCors from "./config/cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configCors(app)

const PORT = process.env.PORT || 8080;

configViewEngine(app);

connection()

initWebRoutes(app);
initApiRoutes(app)

app.listen(PORT, () => {
  console.log("Server BE is running in port", PORT);
});
