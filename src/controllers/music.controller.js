const musicModel = require('../models/music.model')



async function createModel(req,res){
const token = req.cookies.token;

//If server is not getting token in response that means this person is not registerd yet
if(!token){
    return res.status(401).json({message:"Unauthorized"})
}

try {

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    if(decoded.role = "artist"){
        return res.status(403).json({message:"You dont have access to create music"})
    }
    
} catch (error) {
    return res.status(401).json({message:"Unauthorized"})
}

const {title} = req.body;
const file = req.file;

}