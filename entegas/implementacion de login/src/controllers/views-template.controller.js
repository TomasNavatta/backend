const { Router } = require('express')

const router = Router()

router.get('/login', (req, res) => {
    const isAuthenticated = req.session.user !== undefined;
    res.render('login.handlebars', {style: 'style.css', isAuthenticated})
})

router.get('/signup', (req, res) => {
    const isAuthenticated = req.session.user !== undefined;
    res.render('signup.handlebars', {style: 'style.css', isAuthenticated})
})

module.exports = router