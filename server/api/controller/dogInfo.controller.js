const db = require("../../models/db.connect");
const Dog = db.dogInfo;
const Op = db.Sequelize.Op

//GET ALL DOGS
exports.getAll = (req, res) => {
    Dog.findAll().then(dogs =>{
        console.log(JSON.stringify(dogs));
        res.status(200).send({error: false, message:` Succesfully grab all records`,data: dogs});
    }).catch(err => {
        res.status(500).send(err);
    });
}

//GET ONE DOG USING DOG ID
exports.getOne = (req, res) => {
    const id = req.params.id; 
    // console.log(id)
    Dog.findOne(
        {
            where:{id: {[Op.eq]: id }},
            include:[{model: db.blacklists}]
        }).then(dog =>{
            console.log(JSON.stringify(dog));
            res.status(200).send({error: false, message:` Succesfully grab all records`,data: dog});
        }).catch(err => {
        res.status(500).send(err);
    });
}

//CREATE A DOG
exports.create = (req, res) => {
    const dog = {
        dog_name: req.body.name,
        blacklistId: req.body.blacklistID,
        age: req.body.age,
        gender: req.body.gender,
        breed: req.body.breed,
        notes: req.body.notes,
        instructions: req.body.instructions,
        ratings: req.body.ratings
      };
      Dog.create(dog).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({message: err.message || "Some error occured"})
      })
}

//UPDATE A DOG

exports.update = (req,res) => {
    const id = req.params.id;
    console.log(id)
    const updateDog = {
        dog_name: req.body.name,
        blacklistId: req.body.blacklistID,
        age: req.body.age,
        gender: req.body.gender,
        breed: req.body.breed,
        notes: req.body.notes,
        instructions: req.body.instructions,
        ratings: req.body.ratings
    }
    console.log(updateDog);
//find record in db
Dog.findOne({where: {id: {[Op.eq]: id }},})
.then(record => {
  
  if (!record) {
    throw new Error('No record found')
  }

  console.log(`retrieved record ${JSON.stringify(record,null,2)}`) 
  
  record.update(updateDog).then( updatedRecord => {
    console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
    // login into your DB and confirm update
    res.status(200).send(updatedRecord);
  })

})
.catch((error) => {
  // do seomthing with the error
  throw new Error(error)
})

    
//update a record
}
//DELETE A DOG

//Works But needs a response from the server "res.send(status)"
exports.delete = (req,res) => {
    const id = req.params.id
    Dog.destroy({where: {id: {[Op.eq]: id }}})
}