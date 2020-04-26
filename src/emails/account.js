const sgMail = require('@sendgrid/mail')

const key = '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'

sgMail.setApiKey(key)

sgMail.send({
    to: 'saxenasarthak72@gmail.com',
    from: 'saxenasarthak72@gmail.com',
    subject: 'Done',
    test: 'Demn'
}).then(() => {
    console.log('Done')
}).catch((e) => {
    console.log(e)
})