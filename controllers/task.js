// const Task = require('../models/Task')
const { where } = require('sequelize');
const Sequelize     = require('sequelize');
const task          = require('../models').task;


module.exports ={
    create(req, res) {
         return task
              .findOrCreate ({
                  where: {
                        title: req.body.title,
                        description: req.body.description,
                        status: req.body.status,
                        importance: req.body.importance,
                        userName: req.body.userName,
                        userId: req.body.userId
                  }
            })

              .then(task => res.status(200).send(task))
              .catch(error => res.status(400).send(error))
    },

    list(_, res) {
         return task.findAll({})
              .then(task => res.status(200).send(task))
              .catch(error => res.status(400).send(error))
    },

   

    find (req, res) {
         return task.findAll({
               where: {
                     userId: req.params.userId,
               }
         })
         .then(task => res.status(200).send(task))
         .catch(error => res.status(400).send(error))
   },
 
     async delete (req,res, next) {

      try{
          
          await task.destroy(
              {where:
              {id: req.params.id}});
      
          res.json({message: "Operation deleted succesfully"});
       }
       
       catch (error){
           console.log(error);
           next();
       }
      },

       
        async update (req, res, next) {

            try {
                  await task.update ( 
                        
                        {        title: req.body.title,
                                 importance: req.body.importance,
                                 status: req.body.status,
                                 description: req.body.description,
                                 userName: req.body.userName,
                                 userId: req.body.userId
                           },
                           {where:
                              {id: req.params.id}},
                  res.json({message: "Operation updated"})
                  )
            }
            
            catch (error){
                  console.log(error);
                  next();
              }
             },
};