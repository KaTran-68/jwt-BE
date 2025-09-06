import userService from '../service/userService'

const handleUserPage = async (req, res) => {
  const usersList = await userService.getUserList()
  return res.render('users',{
    usersList
  });
};

const handleCreateUser = (req, res) => {
  let {email, password, username} = req.body
  
  userService.createNewUser(email, password, username)
  
  return res.redirect('/users')
}

const handleDeleteUser = (req, res) => {
  let userId = req.params.id
  userService.deleteUser(userId)
  return res.redirect('/users')
}

module.exports = {
  handleUserPage,
  handleCreateUser,
  handleDeleteUser
};
