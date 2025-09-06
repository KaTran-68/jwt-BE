import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const salt = bcrypt.genSaltSync(10);
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'jwt'
});

const hashUserPassword = (userPassword) => {
     return bcrypt.hashSync(userPassword, salt); 
}

const createNewUser = (email, password, username) => {
     let hashPassword = hashUserPassword(password)
     connection.query(
          `
          INSERT INTO users (email, password, username)
          VALUES (?,?,?)
          `,
          [email, hashPassword, username],
          function(err, results, fields){
               console.log(results)
          }
     )
}

const getUserList = async () => {
     let [results, fields] = await connection.query(
          `SELECT * FROM users`
     )
     return results
}

const deleteUser = (id) => {
     connection.query(
          `
          DELETE FROM users WHERE id = ?
          `,
          [id],
          function(err, results, fields){
               console.log(results)
          }
     )
}

module.exports = {
     createNewUser,
     getUserList,
     deleteUser
}