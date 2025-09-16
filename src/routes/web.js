import express from "express"
const homeController = require('../controller/homeController')
const apiController = require('../controller/apiController')

const router = express.Router()

const initWebRoutes = (app) => {
     router.get('/', (req, res) => {
          return res.send("Hello world!")
     })
     router.get('/users', homeController.handleUserPage)
     router.get('/users/update/:id', homeController.handleUpdatePage)
     router.post('/users/create-user', homeController.handleCreateUser)
     router.post('/users/update-user/:id', homeController.handleUpdateUser)
     router.post('/users/delete-user/:id', homeController.handleDeleteUser)

     return app.use('/', router)
}

export default initWebRoutes