const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'saxenasarthak72@gmail.com',
        subject: 'Thanks for signing up for our application',
        text: `Welcome to the app, ${name}. Let us know about your`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'saxenasarthak72@gmail.com',
        subject: `${name}, We are sorry to hear that you are leaving`,
        text: 'Please let us know about your experience with us and what do you think could be improved.'
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}