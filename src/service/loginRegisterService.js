import db from '../models/index'
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
     return bcrypt.hashSync(userPassword, salt); 
}

const checkEmail = async (userEmail) => {
     let user = await db.User.findOne({
          where: {email: userEmail}
     })

     if(user){
          return true
     }
     else{
          return false
     }
}

const checkPhone = async (userPhone) => {
     let user = await db.User.findOne({
          where: {phone: userPhone}
     })

     if(user){
          return true
     }
     else{
          return false
     }
}

const registerNewUser = async (userData) => {
     try{
          let isEmailExist = await checkEmail(userData.email)
          if(isEmailExist === true){
               return {
                    EM: 'The email is already in use',
                    EC: 1,
                    DT: []
               }
          }
          let isPhoneExist = await checkPhone(userData.phone)
          if(isPhoneExist === true){
               return {
                    EM: 'The phone number is already in use',
                    EC: 1,
                    DT: []
               }
          }

          let hashPassword = hashUserPassword(userData.password)

          await db.User.create({
               email: userData.email,
               username: userData.username,
               password: hashPassword,
               phone: userData.phone
          })

          return {
               EM: 'A user is created successfully',
               EC: 0
          }
     }
     catch(e){
          console.log(e)
          return {
               EM: 'Something is wrong in service...',
               EC: -2
          }
     }
}

const checkPassword = (inputPassword, hashPassword) => {
     return bcrypt.compare(inputPassword, hashPassword)
}

const handleUserLogin = async (rawData) => {
     try {
          
          let user = await db.User.findOne({
               where: {
                    [Op.or] : [
                         {email: rawData.valueLogin},
                         {phone: rawData.valueLogin}
                    ]
               }
          })

          if(user){
               console.log('found')
               let isCorrectPassword = await checkPassword(rawData.password, user.password)
               if(isCorrectPassword === true){
                    return {
                         EM: 'Ok!',
                         EC: 0,
                         DT: ''
                    }
               }
               
          }
          return {
               EM: 'Something is not correct!',
               EC: 1,
               DT: ''
          } 

     } catch (e) {
          console.log(e)
          return {
               EM: 'Something is wrong in service...',
               EC: -2
          }
     }
}

module.exports = {
     registerNewUser,handleUserLogin, hashUserPassword, checkEmail, checkPhone 
}