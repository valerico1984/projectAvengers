const Sequelize     = require('sequelize');
const Op            = Sequelize.Op;
const tasks_users   = require('../models').tasks_users; 
const user       = require('../models').user;
const task         = require('../models').task;

module.exports ={
  create(req, res) {
          // Usuario
          const responseUser = user.findOne({
               where: {
                   [Op.or]: [{
                        userName: req.body.user
                   },{
                        id: req.body.user
                   }]
               }
          });
          // Tarea
          const responseTask = task.findOne({
               where: {
                   [Op.or]: [{
                        title: req.body.task
                   },{
                        id: req.body.task
                   }]
               }
          });
          Promise
          .all ([responseUser, responseTask])
          .then(responses => {
               return tasks_users
                   .create ({
                        user_id: responses[0].id,
                        task_id: responses[1].id,
                        
                   })
                   .then(tasks_users => res.status(200).send(tasks_users))
           })
           .catch(error => res.status(400).send(error));
     },
  list(_, res) {
     return tasks_users.findAll({
           include: [{
                model: user,
                as: 'user'
           },{
                model: task,
                as: 'task'
           }]
     })
     .then(tasks_users => res.status(200).send(tasks_users))
     .catch(error => res.status(400).send(error))
  },

  find (req, res) {
     return tasks_users.findAll({
          where: {
                id: req.params.id,
          },
          include: [{
                model: user,
                as: 'user'
           },{
                model: task,
                as: 'task'
           }]
     })
     .then(tasks_users => res.status(200).send(tasks_users))
     .catch(error => res.status(400).send(error))
  },
};