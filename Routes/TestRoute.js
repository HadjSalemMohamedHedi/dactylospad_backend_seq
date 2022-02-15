const express = require('express');
const router = express.Router();
const { User } = require('../Models')

router
    .route('/testroute')
        .get((req,res)=>{
            const token = req.headers.authorization;
            res.json({ token: token });

        })


module.exports = router;