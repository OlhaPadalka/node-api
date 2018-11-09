var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

var User = require('./User');


//CREATE
router.post('/', (req, res)=>{
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    }, 
    (err, user)=>{
        if(err){
            res.status(500).send('Problem wiht adding info to database');
        }else{
            res.status(200).send(user);
        }
    });
});

//RETURN all 
router.get('/', (req, res)=>{

    User.find({}, (err, users)=>{
        if(err){
            res.status(500).send('Problem with finding the users');
        }else{
            res.status(200).send(users);
        }
    });

});

//GET by id
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return res.status(500).send("There was a problem finding the user.");
        }
        if (!user) { 
            return res.status(404).send("No user found.");
        }
        res.status(200).send(user);
    });
});

/// DELETE
router.delete('/:id', (req, res)=> {
    User.findByIdAndRemove(req.params.id, (err, user)=> {
        if (err){ 
            return res.status(500).send("There was a problem deleting the user.");
        }else{
            res.status(200).send("User "+ user.name +" was deleted.");
        }
        
    });
});

// UPDATE
router.put('/:id', (req, res) => {
    
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) {
            return res.status(500).send("There was a problem updating the user.");
        }else{
            res.status(200).send(user);
        }
    });
});


module.exports = router; 