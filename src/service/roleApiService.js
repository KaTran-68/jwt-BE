import db from '../models/index'
import _ from 'lodash'

const createNewRole = async (roles) => {
     try {
          let currRoles = await db.Role.findAll({
               attributes: ['url', 'description'],
               raw: true
          })
          console.log(currRoles)
          const persists = roles.filter(obj1 => 
             !currRoles.some(obj2 => obj2['url'] === obj1['url'])
          );
          if(persists.length === 0){
               return {
                    EM: 'Roles are available!',
                    EC: 0,
                    DT: []
               }
          }
          await db.Role.bulkCreate(persists)
          return {
               EM: `Bulk ${persists.length} roles succesfully!`,
               EC: 0,
               DT: []
          }


     } catch (error) {
          console.log(error)
          return {
               EM: 'Something wrongs with services',
               EC: 1,
               DT: []
          }
     }
}

module.exports = {
     createNewRole,

}