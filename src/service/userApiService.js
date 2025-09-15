import { where } from 'sequelize'
import db from '../models/index'
import loginRegisterService from './loginRegisterService'

const getAllUsers = async () => {
     const data ={
          EM: '',
          EC: '',
          DT: ''
     }
     try {
          let users = await db.User.findAll({
               attributes: ['id', 'username', 'email', 'phone', 'sex', 'address'],
               include: {model: db.Group, attributes: ['name', 'description', 'id']},
          })
          if(users){
               let data = users
               return {
                    EM: 'Get users successfully',
                    EC: 0,
                    DT: data
               }
          }
          else{
               return {
                    EM: 'Get users successfully',
                    EC: 0,
                    DT: []
               }
          }

     } catch (e) {
          console.log(e)
          return {
               EM: 'Something wrongs with services',
               EC: 1,
               DT: []
          }
     }
}

const getUsersWithPagination = async (page, limit) => {
     try {
          let offset = (page - 1) * limit
          
          const {count, rows} = await db.User.findAndCountAll({
               attributes: ['id', 'username', 'email', 'phone', 'sex', 'address'],
               include: {model: db.Group, attributes: ['name', 'description', 'id']},
               offset,
               limit,
               order: [['id', 'DESC']]
          })

          let totalPages = Math.ceil(count/limit)
          let data = {
               totalRows: count,
               totalPages: totalPages,
               users: rows
          }

          return {
               EM: 'Fetch Ok',
               EC: 0,
               DT: data
          }
     } catch (e) {
          console.log(e)
          return {
               EM: 'Something wrongs with services',
               EC: 1,
               DT: []
          }
     }
}

const createUser = async (userData) => {
     try {
          let isEmailExist = await loginRegisterService.checkEmail(userData.email)
          if(isEmailExist === true){
               return {
                    EM: 'The email is already in use',
                    EC: 1,
                    DT: 'email'
               }
          }
          let isPhoneExist = await loginRegisterService.checkPhone(userData.phone)
          if(isPhoneExist === true){
               return {
                    EM: 'The phone number is already in use',
                    EC: 1,
                    DT: 'phone'
               }
          }

          let hashPassword = loginRegisterService.hashUserPassword(userData.password)

          await db.User.create({...userData, password: hashPassword})
          return {
               EM: 'Create an user successfully',
               EC: 0,
               DT: []
          }
     } catch (e) {
          console.log(e)
     }
}

const updateUser = async (data) => {
     try {
          console.log(data)
          if(!data.groupId){
               return{
                    EM: 'Update with empty groupId',
                    EC: 1,
                    DT: 'groupId'
               }
          }
          let user = await db.User.findOne({
               where: {id: data.id}
          })

          if(user){
               await user.update({
                    username: data.username,
                    address: data.address,
                    sex: data.sex,
                    groupId: data.groupId
               })

               return {
                    EM: 'Update an user successfully',
                    EC: 0,
                    DT: ''
               }
          }
          else{
               return{
                    EM: 'User not found',
                    EC: 2,
                    DT: ''
               }
          }
     } catch (e) {
          console.log(e)
          return {
               EM: 'Something wrongs with services',
               EC: 1,
               DT: []
          }
     }
}

const deleteUser = async (id) => {
     try {
          let user = await db.User.findOne({
               where: {id}
          })

          if(user){
               await user.destroy()
               return {
                    EM: 'Delete user succesfully',
                    EC: 0,
                    DT: []
               }
          }
          else{
               return {
                    EM: 'user not exist',
                    EC: 2,
                    DT: []
               }
          }
     } catch (e) {
          console.log(e)
          return {
               EM: 'Something wrongs with services',
               EC: 1,
               DT: []
          }
     }
}

module.exports = {
     getAllUsers,
     createUser,
     updateUser,
     deleteUser,
     getUsersWithPagination
}