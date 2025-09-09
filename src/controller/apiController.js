
const handleRegister = (req, res) => {
     console.log("register", req.body)

}

const testApi = (req, res) => {
     return res.status(200).json({
          message: 'ok',
          data: 'test api'
     })
}

module.exports = {
     testApi,
     handleRegister
}