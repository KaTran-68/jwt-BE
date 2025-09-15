import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import db from '../models'
import { where } from 'sequelize';
import { raw } from 'body-parser';

const salt = bcrypt.genSaltSync(10);
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'jwt'
});

const hashUserPassword = (userPassword) => {
     return bcrypt.hashSync(userPassword, salt); 
}

const createNewUser = async (email, password, username) => {
     let hashPassword = hashUserPassword(password)
     await db.User.create({
          username: username,
          email: email,
          password: hashPassword
     })
}

const getUserList = async () => {

     let newUser = await db.User.findOne({
          where: {id: 1},
          attributes: ['id', 'email', 'username'],
          include: {
               model: db.Group,
               attributes: ['name', 'description'],
          },
          raw: true,
          nest: true
     })

     let roles = await db.Role.findAll({
          attributes: ['url', 'description'],
          include: {
               model: db.Group,
               where: {id: 1},
               attributes: ['name', 'description'], 
          },
          raw: true,
          nest: true 
     })

     let users = []
     users = await db.User.findAll()
     return users
     // let [results, fields] = await connection.query(
     //      `SELECT * FROM users`
     // )
     // return results

}

const deleteUser = async (id) => {
     await db.User.destroy({
          where: {
               id
          }
     })
     
     // connection.query(
     //      `
     //      DELETE FROM users WHERE id = ?
     //      `,
     //      [id],
     //      function(err, results, fields){
     //           console.log(results)
     //      }
     // )
}

const getUserById = async (id) => {
     let user = {}
     user = await db.User.findOne({
          where: {
               id
          }
     })
     return user
     // let [results, fields] = await connection.query(
     //      `SELECT * FROM users WHERE id=?`,
     //      [id]
     // )
     // return results
}

const updateUser = async (email, username, id) => {
     await db.User.update(
          {email, username},
          {
          where: {id}
          }
     )
     
     // let [results, fields] = await connection.query(
     //      `UPDATE users
     //      SET email = ?, username = ?
     //      WHERE id = ?;
     //      `,
     //      [email, username, id]
     // )
     // return results
}
module.exports = {
     createNewUser,
     getUserList,
     deleteUser,
     getUserById,
     updateUser
}