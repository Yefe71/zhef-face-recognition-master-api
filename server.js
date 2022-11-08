import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors('http://localhost:3000'))

//TEMP SAMPLE DATABASE
const database = {
    users: [
        {
         id: '123',
         name: 'John',
         email: 'john@gmail.com', 
         password: 'cookies',
         entries: 0,
         joined: new Date()   
        },
        {
         id: '124',
         name: 'Sally',
         email: 'sally@gmail.com',
         password: 'bananas',
         entries: 0,
         joined: new Date()   
        },
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}


 


//ROOT
app.get('/', (req, res) => {
    res.send(database.users)
})

//SIGN IN
app.post('/signin', (req, res) => {

    if (req.body.email === database.users[0].email &
        req.body.password === database.users[0].password) {

            res.json('success');
   
        }
    else {

        res.status(400).json('There was an error logging in');

    }
 
})



//REGISTER
app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()   
    })

    res.json(database.users[database.users.length - 1])

})


//PROFILE
app.get('/profile/:id', (req, res) => {
 
    
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found){
        res.status(404).json('no such user');
    }
})


//IMAGE
app.post('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found){
        res.status(404).json('no such user');
    }

})







app.listen(3000, () => {
    console.log("app is running on port 3000")
})




/*

/signin --> POST res = success/fail
/register --> POST res = user
/profile/:userId --> GET res = user
/image --> PUT res = updated user rank
*/