import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require('dotenv').config()

const PORT = process.env.PORT || 8080;

const app = express();

configViewEngine(app);

initWebRoutes(app);

app.listen(PORT, () => {
     console.log("Server BE is running in port", PORT)
})