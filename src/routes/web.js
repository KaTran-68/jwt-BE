import express from "express"
const homeController = require('../controller/homeController')

const router = express.Router()

const initWebRoutes = (app) => {
     router.get('/', (req, res) => {
          return res.send("Hello world!")
     })
     router.get('/user', homeController.handleUserPage)

     return app.use('/', router)
}

export default initWebRoutes