const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendWelcomeEmail = (email, name) => {

    sgMail.send({
        to: email,
        from: 'jessegerroir@gmail.com',
        subject: 'Welcome!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
}

const sendCancelEamil = (email, name) => {
    sgMail.send({
        to: email,
        from: 'jessegerroir@gmail.com',
        subject: 'Goodbye!',
        text: `Sorry to see you go ${name}!`
    })
}

// export in object to export multiple functions
module.exports = {
    sendWelcomeEmail,
    sendCancelEamil
}

