import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt'
});

export default connection;


const handleUserPage = (req, res) => {
  return res.render('users');
};

const handleCreateUser = (req, res) => {
  let {email, password, username} = req.body
  
  connection.query(
    `
      INSERT INTO users (email, password, username)
      VALUES (?,?,?)
    `,
    [email, password, username],
    function(err, results, fields){
      console.log(results)
    }
  )
  return res.send('success')
}

module.exports = {
  handleUserPage,
  handleCreateUser
};
