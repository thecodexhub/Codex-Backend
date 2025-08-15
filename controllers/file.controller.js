const Image = require('../models/file.model');

// Upload image
exports.uploadImage = async (req, res) => {
  try {
    const newImage = new Image({
      name: req.file.originalname,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    await newImage.save();

    res.status(200).json({
      message: 'Image uploaded successfully',
      imageId: newImage._id,
      imageUrl: newImage.image.data.toString('base64')
    });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed', details: error.message });
  }
};

// Get image by ID
exports.viewImage = async (req, res) => {
  try {
    const img = await Image.findById(req.params.id);
    if (!img) return res.status(404).json({ error: 'Image not found' });

    res.contentType(img.image.contentType);
    res.send(img.image.data);
  } catch (error) {
    res.status(500).json({ error: 'Image fetch failed', details: error.message });
  }
};