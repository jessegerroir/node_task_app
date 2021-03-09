const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');

const imageProcessing = require('./../utils/image_processing');

const router = new express.Router();

// const upload = multer({
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(request, file, callback) {

//         // check file extension
//         if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
//             // send back error
//             return callback(new Error('Please upload a jpg, jpeg, or png image'));
//         }

//         // upload went successful
//         return callback(undefined, true);
//     }
// });


// Create user 
router.post('/users', async (request, response) => {
    
    // Create new user based on posted data
    const user = new User(request.body);
    try {
        await user.save();

        const token = await user.generateAuthToken();
        response.status(201).send({user, token});
    } catch (error) {
        response.status(400).send(error);
    }
});

// Login User
router.get('/users/login', async (request, response) => {
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password);
        const token = await user.generateAuthToken();
        response.send({ user, token});
    } catch (error) {
        response.status(400).send(error);
    }
});

// Logout all user sessions
router.get('/users/logoutAll', async (request, response) => {
    try {
        // wipe all tokens by setting to empty array
        request.user.tokens = [];
        // save user
        await request.user.save();
    } catch (error) {
        response.status(400).send(error);
    }
});


// ----- Everything below this requires the user to be signed in ----- //

// Logout User
router.post('/users/logout', auth, async (request, response) => {
    try {
        // get all the tokens saved to the user
        // filter out the one in the request
        request.user.tokens = request.user.tokens.filter((token) => {
            return token.token !== request.token;
        });
        // save the user so the token is removed
        await request.user.save();
        response.send(200);
    } catch (error) {
        response.send(500).send();
    }
});

// Get user info 
router.get('/users/me', auth, async (request, response) => {
    response.send(request.user);
});


// Update user info 
router.patch('/users/me', auth, async (request, response) => {
    const updates = Object.keys(request.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    // throw an error if we are trying to update a field that doesn't exist in the table
    if (!isValid) {
        return response.status(400).send({ error: 'invalid updates!'});
    }

    try {
        // loop through update fields and update user values
        updates.forEach((update) => request.user[update] = request.body[update]);
        // save user with await (throws error if it fails);
        await request.user.save();
        response.send(request.user);
    } catch (error) {
        response.status(400).send(error);
    }
});

// Delete User 
router.delete('/users/me', auth, async (request, response) => {
    try {
        await request.user.remove();
        response.send(request.user);
    } catch (error) {
        response.status(500).send();
    }
});


// Upload user avatar 
router.post('/users/me/avatar', auth, imageProcessing.upload.single('avatar'), async (request, response) => {
    
    // add the image binary to the user avatar field

    // Resize image
    const buffer = await imageProcessing.resize(request.file.buffer);    

    // set value of avatar field 
    request.user.avatar = buffer;

    //save user
    await request.user.save();

    response.send();
}, (error, request, result, next) => { // this handles uncaught errors
    result.status(400).send({ error: error.message })
});

// Delete users avatar 
router.delete('/users/me/avatar', auth, async (request, response) => {
    // set users avatar value to undefined
    request.user.avatar = undefined;
    // save user
    await request.user.save();
    // return response
    response.send();
});

// Get avatar of specific user (does not require login)
router.get('/users/:id/avatar', async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }

        // send back the image
        response.set('Content-Type', 'image/png')
        response.send(user.avatar);

    } catch (error) {
        response.status(404).send();
    }
})


// Export all the routes
module.exports = router;
