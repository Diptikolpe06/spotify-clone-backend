const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function registerUser(req,res){

    const {username , email, password, role="user" } = req.body
    const isUserAlreadyExists = await userModel.findOne({
       $or:[
        {username},
        {email}
       ]  
    })

    if(isUserAlreadyExists){
        returnvres.status(409).json({
            message:"User already exists"
        })
    }

    const user = await userModel.create({
        
    })

}