const musicModel = require('../models/music.model')
const albumModel = require('../models/album.model')
const jwt = require('jsonwebtoken')
const { uploadFile } = require('../services/storage.service')



async function createMusic(req, res) {
    const token = req.cookies.token;

    //If server is not getting token in response that means this person is not registerd yet
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You dont have access to create music" })
        }



        const { title } = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString('base64'))

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id,

        })

        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist,

            }
        })

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }

}

async function  createAlbum(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You dont have access to create music" })
        }

        const { title, musics } = req.body

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics: musics
        })

        res.status(201).json({
            message: "Album created successfully",
            music: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics

            }

        })


    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }

}

async function getAllMusic(req,res){

    const musics = await musicModel
    .find()
    .skip(1)  // it will skip one music from musics array
    .limit(1) // It will return only one music.This function will return limited musics.In real application there are millions of songs so they use limit of 20,30 somgs and this no. songs will appeare on screen    .populate("artist");
    
     res.status(200).json({
        message:"Musics fetched successfully",
        musics:musics,
     })   
        

    
}

async function getAllAlbums(req,res){
    const albums = await albumModel.find().select("title artist").populate("artist","username email");

     res.status(200).json({
        message:"Albums fetched successfully",
        albums:albums,
     })   
}

async function getAlbumById(req,res){
    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate("artist","username email")

    return res.status(200).json({
        message:"Album fetched successfully",
        album: album
    })
}




module.exports = { createMusic ,createAlbum,getAllMusic ,getAllAlbums,getAlbumById}
