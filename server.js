require('dotenv').config();
var cors = require('cors')

const port = process.env.port || 3307;
const express = require('express');
const helmet = require('helmet');
const app = express();
const db = require('./Config/database');
const Body = require('body-parser')
var session = require('express-session')

app.use(Body.json())
app.use(Body.urlencoded({ extended: true }))

app.use(session({
    key: "id",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 1000 * 24,
    }
}));





//this application use a helmet package, to secure all headers
app.use(helmet())
app.use(cors())




//Require All Routes
const testRoute = require('./Routes/TestRoute')
const Login = require('./ModuleAuth/ModuleAuth')





//Use all routes
app.use('', testRoute)
app.use('', Login)





//Authentification DataBase
db.authenticate().then(() => {
    console.log('Connexion établie avec success !!! ')
}).catch(err => {
    console.error('Probléme de connexion')
})



//Home Page
app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.status(200).send('Welcome To Server BackDactReporting !')
});



//Starting Server
app.listen(port, function () {
    console.log('Server running at port ' + port);
})

