const pageNotFoundController = require('express').Router();

pageNotFoundController.get('*', (req, res, next) => {
    res.render('404', {
        title: 'Error page'
    });
})

module.exports = pageNotFoundController;