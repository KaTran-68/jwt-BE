import { where } from 'sequelize'
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

const getAllRoles = async () => {
     try {
          let data = await db.Role.findAll()
          return{
               EM: 'Get all roles successfully',
               EC: 0,
               DT: data
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

const deleteRole = async (id) => {
     try {
          let role = await db.Role.findOne({
               where: {id}
          })
          if(role){
               await role.destroy()
          }
          return{   
               EM: 'Delete role successfully',
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

const getRoleByGroupId = async (id) =>{
     try {
          if(!id){
               return {
               EM: 'Not found any roles',
               EC: 0,
               DT: []
          }
          }
          let roles = await db.Group.findOne({
               where: {id},
               attributes: ["id", "name", "description"],
               include: {
                    model: db.Role,
                    attributes: ["id", "url", "description"],
                    through: { attributes: [] }
               }
          })


          return{   
               EM: 'Get role by group successfully',
               EC: 0,
               DT: roles 
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

const assignRoleToGroup = async (data) => {
     try {
          await db.Group_Role.destroy({
               where: {groupId: +data.groupId}
          })
          await db.Group_Role.bulkCreate(data.groupRoles)
          return{   
               EM: 'Assign roles to group successfully',
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
     getAllRoles,
     deleteRole,
     getRoleByGroupId,
     assignRoleToGroup
}