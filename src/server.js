import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import connection from './config/connectDB'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

configViewEngine(app);

connection()

initWebRoutes(app);

app.listen(PORT, () => {
  console.log("Server BE is running in port", PORT);
});
