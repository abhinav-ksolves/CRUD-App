
const db = require('../models/dbSetup');
const User = db.Users;
const Op = db.Sequelize.Op;

//create and save with new user
exports.create = (req,res)=>{
    if(!req.body.firstName){
        res.status(400).send({msg:"firstname is required"});
        return;
    }

    const newUser = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        salary: Number(req.body.salary)
    }

    User.create(newUser)
    .then((result) => {
        res.redirect('/users');
    }).catch((err) => {
        res.status(500).send({
              message:err.message || "some error occured while creating user"
        });
    });
};

//retriving all users
exports.findAll = (req,res)=>{
           const salary = req.body.salary;
           User.findAll({where:null})
           .then((data)=>{
               const sortedUsers = data.sort((user1,user2)=>user1.id-user2.id);
               res.render('index',{title:'User Details',data:sortedUsers});
            //    res.send(data);
           })
           .catch((err)=>{
               res.status(500).send({
                   message:err.message || "some erro occred while retriving data"
               });
           });
};

//finding single user based on id
exports.findOne = (req,res)=>{
            const id = req.params.id;
            User.findByPk(id)
            .then((data)=>{
                
                    res.render('updateUser',{title:"update user",data:data});
                
            })
            .catch((err)=>{
                res.status(500).send({
                    message:err.message || "some erro occred while retriving data using id"
                });
            });
}


//update a user based on id
exports.update = (req,res)=>{
           const id = req.params.id;
           User.update(req.body,{where:{id:id}})
           .then(num=>{
                if(num==1){
                    res.redirect('/users')
                }
                else{
                    res.send({
                        message:"Can't  update"
                    });
                }
           })
           .catch((err)=>{
            res.status(500).send({
                message:err.message || "some error occred while updating data using id"
            });
        });
}

//delete user based on id
exports.delete = (req,res)=>{
    const id = req.params.id;
    User.destroy({where:{id:id}})
    .then(num=>{
         if(num==1){
             res.redirect('/users');
         }
         else{
             res.send({
                 message:"Can't  delete"
             });
         }
    })
    .catch((err)=>{
     res.status(500).send({
         message:err.message || "some error occred while deleting user"
     });
 });
}

//delete all record
exports.deleteAll = (req,res)=>{
       User.destroy({where:{},truncate:false})
       .then((nums)=>{
        res.redirect('/users');
       })
       .catch((err)=>{
        res.status(500).send({
            message:err.message || "some error occred while removing all users"
        });
       });
}


