const { Router } = require('express')
const passport = require('passport')

const router = Router()

router.post('/', passport.authenticate('login', {failureRedirect: '/auth/fail-login'}), async (req, res) =>{
    try {
        
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role,
    }

    res.redirect('/products')
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ status: 'error', error: 'Interal Server Error'})
    }
    

})

router.get('/fail-login', (req, res) => {
    res
    .status(400)
    .json({ status: 'error', error: 'Bad request'})
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.json({ success: false, message: err });
        }
        res.json({ success: true, message: 'Sesión destruida correctamente' });
    });
})

router.get('/github', passport.authenticate('github', {scope: ['user: email']}), (req, res) =>{

})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) =>{
    req.session.user = req.user
    res.redirect('/products')
})


module.exports = router