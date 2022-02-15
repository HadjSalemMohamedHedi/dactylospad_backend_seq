const express = require('express');
const router = express.Router();
const { Compte, Utilisateur } = require('../Models')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwtUtils = require('../JwtUtil/Jwt')
var session = require('express-session');
const saltRound = 10;
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')



const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        type: "login", // default
        Username: "hedi.h@mbdesign-tn.com",
        pass: "Mohamed1994."
    }
});

router
    .route('/LogIn')
    .post((req, res) => {
        Email = req.body.email;
        Password = req.body.password;
        Compte.findOne({ where: { Email: Email } })
            .then((User) => {
                if (User == null) {
                    res.json({ Response: "Null" })
                } else {
                    bcrypt.compare(Password, User.Password, function (err, result) {
                        if (result) {
                            const token = jwtUtils.generateTokenforUser(User)
                            let t = [];
                            t.push(User)
                            req.session.user = t;
                            res.json({ user: User, token: token, auth: true, session: req.session })
                        } else {
                            res.json({ Response: "Null" })
                        }
                    });
                }
            }).catch((eure) => {
                //  res.json({ eur: eure })
            })

    })

router
    .route('/Regiter')
    .post((req, res) => {
        Email = req.body.email;

        Compte.findOne({ where: { Email: Email } })
            .then((resu) => {
                if (resu == null) {
                    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                        Compte.create({
                            Email: req.body.email,
                            Password: hash,
                            Role: "User"
                        }).then((User) => {
                            Utilisateur.create({
                                nom: req.body.nom,
                                Prenom: req.body.prenom,
                                Adresse: req.body.adresse,
                                Ville: req.body.ville,
                                CompteId: User.id
                            })
                            res.json({ Response: "success" });
                        }).catch((eur) => {
                            res.json({ Response: "eurreur" });

                        })
                    });


                } else {
                    res.json({ Response: "existe" });

                }
            })
    })





//Verification Token
const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"]
    if (!token) {
        res.send("you , need a token ")
    } else {

        jwt.verify(token, "14moh#ht74879", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "you failed to authentification", err: err, token: token });
            }
            else {
                req.userId = decoded.id;
                res.json({ auth: true, token: token });
                //  next();
            }
        })
    }
}


// Test if is User Auth
router
    .route('/isuserAuth')
    .get(verifyJWT, (req, res) => {
        req.send(res)
        //res.send('tu es deja connecter ')
    })




router
    .route("/getsession")
    .get((req, res) => {

        if (req.session.user) {
            res.json({ loggedIn: true, user: req.session.user })
            res.send({ req: req })

        }
        else {
            //res.send({ loggedIn: false })
            res.send({ req: req.session })

        }
    })


//Login
router
    .route('/ResetPassword')
    .post((req, res) => {
        email = req.body.email
        password = req.body.password
        NouveauPass = req.body.NouveauPass
        Compte.findOne({
            where: { Email: email }
        }).then((User) => {
            if (User) {
              
                 
                        bcrypt.hash("123456", saltRound, (err, hash) => {
                            Compte.update({
                                Password: hash
                            },
                                { where: { Email: email } }).then(() => {
                                    res.json({ message: "success" })
                                }).catch((eur) => {
                                    res.json({ message: "Eurror" })
                                })

                        })
                   
                   
            
            }
            else {
                res.json({ message: "Invalid Compte" })
            }

        })
    })





module.exports = router;















