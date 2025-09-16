import loginRegisterService from '../service/loginRegisterService'


const handleRegister = async (req, res) => {
     try{
          if(!req.body.email || !req.body.phone || !req.body.password){
               return res.status(200).json({
                    EM: 'Missing required parameters',
                    EC: '1',
                    DT: ''
               })
          }

          if(req.body.password && req.body.password.length < 6){ 
               return res.status(200).json({
                    EM: 'Your password must have more than 5 letters',
                    EC: '1',
                    DT: 'isValidPassword'
               })
          }

          let data = await loginRegisterService.registerNewUser(req.body)


          return res.status(200).json({
               EM: data.EM,
               EC: data.EC,
               DT: data.DT
          })
     }
     catch(e){
          return res.status(500).json({
               EM: 'error from server',
               EC: '-1',
               DT: ''
          })
     }

}

const handleLogin = async (req, res) => {
     try {
          let data = await loginRegisterService.handleUserLogin(req.body)
          if(data && data.DT.access_token){
               res.cookie("jwt", data.DT.access_token, {httpOnly: true, maxAge: 60 * 60 * 1000 })
          }
          
          return res.status(200).json({
               EM: data.EM,
               EC: data.EC,
               DT: data.DT
          })
     } catch (e) {
          return res.status(500).json({
               EM: 'error from server',
               EC: '-1',
               DT: ''
          })
     }
}

const handleLogout = (req, res) => {
     try {
          res.clearCookie('jwt')
          return res.status(200).json({
               EM: 'Logout Ok!',
               EC: 0,
               DT: ''
          })
     } catch (error) {
          return res.status(500).json({
               EM: 'error from server',
               EC: '-1',
               DT: ''
          })
     }
}

module.exports = {
     handleRegister,
     handleLogin,
     handleLogout,
}