const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const uploadsDir = path.join(__dirname, '..', 'uploads');

// Set storage engine to save files in uploads/ with unique names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const randomName = crypto.randomBytes(12).toString('hex');
    cb(null, `${Date.now()}-${randomName}${ext}`);
  }
});

// File filter to only allow certain image types
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and WEBP images are allowed'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB max file size
  fileFilter: imageFileFilter
});

module.exports = upload;
