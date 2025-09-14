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

const testApi = (req, res) => {
     console.log(req.body)
     return res.status(200).json({
          message: 'ok',
          data: 'test api login'
     })
}

module.exports = {
     testApi,
     handleRegister,
     handleLogin
}