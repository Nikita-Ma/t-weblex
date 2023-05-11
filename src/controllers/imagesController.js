const path = require('path')

// * @desc Fetch image
// * @route GET images/id=number
// * @access Public
const getImages = (req, res) => {
  const imagePath = path.join(__dirname, '../uploads', `${req.query.id}`) // Replace with the actual path to your image
  return res.sendFile(imagePath)
}

module.exports = getImages
