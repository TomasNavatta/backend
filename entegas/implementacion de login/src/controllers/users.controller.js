const { Router } = require('express');
const User = require('../model/user.model');

const router = Router();

router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        console.log(req.body);

        // Verificar si el correo electrónico ya existe en la base de datos.
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // El correo electrónico ya existe, devuelve un error.
            return res.status(400).json({ status: 'error', error: 'Email already exists' });
        }

        const newUserInfo = {
            first_name,
            last_name,
            email,
            password,
        };
        console.log(newUserInfo);
        const user = await User.create(newUserInfo);

        res.json({ status: 'success', message: user });
    } catch (error) {
        res.json({ status: 'error', error });
    }
});

module.exports = router;
