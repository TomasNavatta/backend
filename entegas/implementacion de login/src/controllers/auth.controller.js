const { Router } = require('express')
const User = require('../model/user.model')

const router = Router()

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body);
    const user = await User.findOne({ email: email})

    if(!user) return res.status(400).json({ message: 'Bad request'})

    if(user.password !== password) return res.status(400).json({ message: 'Bad request'})

    req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    }


    req.session.save(err => {
    if(err) {
        console.log(err);
    } else {
        res.redirect('/products')
    }
})
    } catch (error) {
        res.json({ status: 'error', 'error': error})
    }
    
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.json({ success: false, message: err });
        }
        res.json({ success: true, message: 'Sesión destruida correctamente' });
    });
})

module.exports = router