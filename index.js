const express = require('express');

const server =  express();

server.use(express.json());

const users = ['zeca', 'robson', 'julia', "genaro" ];

server.use((req,res, next) =>{
    console.log(`Método: ${req.method}; Url ${req.url} `)
    return next();
})

function checkUserExists(req,res,next) {
    if(!req.body.name){
        return res.status(400).json({ error: 'User is required!'})
    }
    return next();
}

function checkUserInArray(req, res, next){
    const user = users[req.params.index]
    if(!user){
        return res.status(400).json({error: 'user does not exist' })
    }
    req.user = user;
    return next();
}

server.get('/users/', (req ,res) =>{
    return res.json(req.user);
})

server.get('/users/:index', checkUserInArray, (req, res) =>{
    const {index} = req.params;
    return res.json(users[index]);
})

server.post('/users', checkUserExists, (req, res) =>{
    const {name} = req.body;
    users.push(name);
    return res.json(users);
})

server.put('/users/:index', checkUserExists, checkUserInArray, (req,res)=>{
    const { index } = req.params;
    const { name } = req.body;
    users[index] = name;
    return res.json(users)
})

server.delete('/users/:index', checkUserInArray, (req,res) =>{
    const { index } = req.params;
    users.splice(index,1);
    return res.json(users);
})

server.listen(3000);


