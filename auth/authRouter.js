const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helpers = require('../users/usersModel');

const router = express.Router();

router.post('/', async (req, res, next) => {
   try {
       const { username } = req.body;
       const user = await helpers.findBy({ username }).first();

       if (user) {
            return res.status(409).json({
                errorMessage: 'Username is already taken'
            })
       }
       res.status(201).json(await helpers.add(req.body))
   } catch (e) {
       next(e)
   }
});

router.post('/login', async (req, res, next) => {
    const authError = {
        errorMessage: 'Invalid Credentials'
    };

    try {
        const { username, password } = req.body;

        const user = await helpers.findBy({ username }).first()
        if (!user) {
            return res.status(401).json(authError)
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(401).json(authError)
        }

        const payload = {
            userId: user.id,
            userName: user.username,
            department: user.department
        };
console.log(payload);
        const token = jwt.sign(payload, process.env.JWT_PASSCODE);

        res.cookie('token', token);
console.log
        res.json({
            message: `Welcome ${user.username}`
        })

    } catch (e) {
        next(e)
    }

});

module.exports = router;
