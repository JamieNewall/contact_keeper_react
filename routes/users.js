const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// bring in model
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// @route POST api/users
// @desc Register a User
// @access Public

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please enter password with 6 or more chars').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // console.log('endpoint hit to start')
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // res.send(req.body.name)
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      console.log('endpoint hit')
      if (user) {
        
        res.status(400).json({ msg: 'User already exists' });
      }
      // create new user using mongoose db user model
      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);
      // gives hashed version of password
      user.password = await bcrypt.hash(password, salt)
      await user.save();
      
      const payload = {user:{id: user.id}}
      // to generate token
      jwt.sign(payload,config.get('jwtSecret'), {
        expiresIn: 360000
      },(err,token) => {
        if(err) throw err;
        res.json({token})
      })

    } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
    }
  }
);

module.exports = router;
