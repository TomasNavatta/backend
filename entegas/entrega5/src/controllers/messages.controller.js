const Message = require("../models/messages.model");
const { Router } = require('express')

const router = Router()

router.post('/', async (req, res) => {
    try {
        const { user, message } = req.body;
        const newMessage = new Message({ user, message, createdAt: new Date () });
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Mensaje guardado con éxito' });
    } catch (error) {
        console.error('Error al guardar el mensaje:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

module.exports = router