const express = require('express');
const router = express.Router();
const user = require('../models/users')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const jwtsecretkey="ThisistheEndtoEndEncryptedChannel"

router.post('/createuser',
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        let email = req.body.email;
        let userData = await user.findOne({ email });

        if(userData)
        {
            return res.status(400).json({ error: "Email already exist" });
        }

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors : errors.array() });
        }
    
        const salt=await bcrypt.genSalt(10);
        let secPassword = await  bcrypt.hash(req.body.password,salt)
        try {
            await user.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })


router.post('/loginuser',
    body('email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await user.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }
            const data ={
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtsecretkey);
            return res.json({ success: true , authToken:authToken});
        }
        catch (error) {
            console.log(error.message);
            res.json({ success: false });
        }
    })
module.exports = router;