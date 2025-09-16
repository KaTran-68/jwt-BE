import express from "express"
const apiController = require('../controller/apiController')
const userController = require('../controller/userController')
const groupController = require('../controller/groupController')
import {checkUserJWT, checkUserPermission} from '../middleware/JWTAction'

const router = express.Router()

const initApiRoutes = (app) => {

     router.all(/.*/, checkUserJWT, checkUserPermission)

     router.post("/register", apiController.handleRegister)
     router.post("/login", apiController.handleLogin)
     router.post("/logout", apiController.handleLogout)

     router.get('/account', userController.getUserAccount)

     router.get("/user/read", userController.readFunc)
     router.post("/user/create", userController.createFunc)
     router.put("/user/update", userController.updateFunc)
     router.delete("/user/delete", userController.deleteFunc)

     router.get("/group/read", groupController.readFunc)

     return app.use('/api/v1/', router)
}

export default initApiRoutes