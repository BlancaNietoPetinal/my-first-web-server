const express = require('express');
const bcrypt = require('bcrypt')
const app = express();


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json())

const users = []

app.get('/', (req, res) => {
    res.send("Holi queen")
})

app.get('/users', (req,res)=>{
    try {
        res.json(users)
        res.status(201).send()
    } catch (error) {
        res.status(500).send()
    }
    
})

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const user = {name: req.body.name,
                    password: hashedPassword}
        users.push(user)
        res.status(201).send()
        console.log(user)
    } catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {

    const user = users.find(user => user.name === req.body.name)

    if (user===null){
        return res.status(400).send('Cannot find user')
    }
    try {
        
       if ( await bcrypt.compare(req.body.password, user.password)){
                res.send({message:'allowed'})
            } else{
                res.send({message:'not allowed'})
            }
    } catch (error) {
        res.status(500).send()
        
    }
})  

app.listen(3050, ()=> console.log('Listening on port 3000'))