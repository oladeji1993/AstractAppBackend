const express = require('express');
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

router.post('/login', async (req, res) =>{
    const { email, password } = req.body 
     const isUser = await user.findOne({ email }).lean()

     if(!isUser){
         return res.json({ status: 'error', error: 'Invalid username or password' })
     }

     if(await bcrypt.compare(password, isUser.password)){
         const token = jwt.sign({ id: isUser._id, username: isUser.username },secret)
          return res.json({ status: 'success', token: token, data: isUser.username })
     }
     res.json({ status: 'error', error: 'Invalid username or password' })
    try {
        const complaints = await complaint.find()
        res.json(complaints)
    }catch (err){
        res.status(500).json({message: err.message})
    }   
})


router.post('/register', async (req, res) =>{

    const password = await bcrypt.hash(req.body.password, 10)
    const createUser = new user({
        username: req.body.username,
        role:req.body.role,
        email:req.body.email,
        password: password
    })
    try {
        const newComplaint = createUser.save()
        res.status(201).json({message: "User Created Successfully"})
    }catch(err){
        if(error.code === 1100){
            return res.json({status: 'error', error: 'Username or email already in use'})
        }
        res.status(400).json({message: err.message})
    }
})

module.exports = router;