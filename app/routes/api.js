module.exports = function(router) {

    router.post('/contact', (req, res) => {

    });

    const mail = require('../../mail')


    router.post('/sendMail', (req, res) => {
        console.log(req.body)
        res.send('hey')
        const message = '\nFrom: ' + req.body.name + '\n'  + 'Email: ' + req.body.email + '\n\n' + req.body.message
        mail(req.body.subject, message)
    })



    return router
};