const cloudinary = require('cloudinary').v2

// cloudinary.config({
//   cloud_name:`${process.env.CLOUDINARY_NAME}`,
//   api_key:`${process.env.CLOUDINARY_API_KEY}`,
//   api_secret:`${process.env.CLOUDINARY_API_SECRET}`
// })
cloudinary.config({
  cloud_name: 'riportimages',
  api_key: '584147138699383',
  api_secret: 'qOdbG53C_Kpt9ZA-3TOxvqwtoRE'
});

module.exports = cloudinary
