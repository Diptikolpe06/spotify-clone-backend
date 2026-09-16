const {Imagekit} = require('@imagekit/nodejs')

const ImageClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY // This is the default and can be omitted
});