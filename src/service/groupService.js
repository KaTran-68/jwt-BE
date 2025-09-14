import db from '../models/index'

const getGroups = async () => {
     try {
          let data = await db.Group.findAll({
               order: [
                    ['name', 'DESC']
               ]
          })
          return {
               EM: 'Get Groups succes',
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

module.exports = {
     getGroups
}