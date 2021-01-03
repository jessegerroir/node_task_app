const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancelEamil } = require('../emails/account');
const router = new express.Router();

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


// We're defining our requests
router.post('/users', async (request, response) => {
    
    // Create new user based on posted data
    const user = new User(request.body);
    try {
        await user.save();

        // call welcome email function
        sendWelcomeEmail(user.email, user.name);

        const token = await user.generateAuthToken();
        response.status(201).send({user, token});
    } catch (error) {
        response.status(400).send(error);
    }
});

router.get('/users/login', async (request, response) => {
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password);
        const token = await user.generateAuthToken();
        response.send({ user, token});
    } catch (error) {
        response.status(400).send(error);
    }
});


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


router.get('/users/me', auth, async (request, response) => {
    response.send(request.user);
});

// router.get('/users/:id', async (request, response) => {
    
//     const _id = request.params.id;

//     try {
//         const user = await User.findById(_id);
//         if (!user) {
//             return response.status(404).send();
//         }
//         response.send(user);
//     } catch (error) {
//         response.status(500).send();
//     }
// });

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


router.delete('/users/me', auth, async (request, response) => {
    try {

        // call welcome email function
        sendCancelEamil(request.user.email, request.user.name);

        await request.user.remove();

        response.send(request.user);
    } catch (error) {
        response.status(500).send();
    }
});


router.post('/users/me/avatar', auth, upload.single('avatar'), async (request, response) => {
    
    // add the image binary to the user avatar field

    // Use sharp to resize and reformat image
    const buffer = await sharp(request.file.buffer).resize({ width: 250, height: 250}).png().toBuffer();

    // set value of avatar field 
    request.user.avatar = buffer;

    //save user
    await request.user.save();

    response.send();
}, (error, request, result, next) => { // this handles uncaught errors
    result.status(400).send({ error: error.message })
});

router.delete('/users/me/avatar', auth, async (request, response) => {
    // set users avatar value to undefined
    request.user.avatar = undefined;
    // save user
    await request.user.save();
    // return response
    response.send();
});

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

module.exports = router;
