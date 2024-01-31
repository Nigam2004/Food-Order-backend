const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const cloudinaryUploder = async (filePath) => {
  // console.log(filePath);
  try {
    const result = await cloudinary.uploader.upload(filePath);
    // console.log(result);
    return result;
  } catch (error) {
    // next(error.message);
    console.log(error);
  }
};

module.exports = cloudinaryUploder;
