import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api"
require("dotenv").config();
import connection from './config/connectDB'
import configCors from "./config/cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

configCors(app)

const PORT = process.env.PORT || 8080;

configViewEngine(app);

connection()

initWebRoutes(app);
initApiRoutes(app)

app.use((req, res) => {
  return res.send('404 not found')
})

app.listen(PORT, () => {
  console.log("Server BE is running in port", PORT);
});
