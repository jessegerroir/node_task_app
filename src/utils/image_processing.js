
const sharp = require('sharp');
const multer = require('multer');

// Call to multer with settings
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(request, file, callback) {

        // check file extension
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            // send back error
            return callback(new Error('Please upload a jpg, jpeg, or png image'));
        }

        // upload went successful
        return callback(undefined, true);
    }
});

const resize = async (fileBuffer) => {

    const result = await sharp(fileBuffer)
                    .resize({ width: 250, height: 250})
                    .png()
                    .toBuffer();

    return result;
}

module.exports = {
    upload,
    resize
}