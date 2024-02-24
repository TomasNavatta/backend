import { Router } from "express"
import userModel from "../dao/models/Users.model.js"

const router = new Router()

router.post("/register", async (req,res)=>{

    const {first_name, last_name, email, age, password} = req.body

    const exists = await userModel.findOne({email})

    if(exists){
        return res.status(400)
        .send({
            status: "error",
            error: "el usuario ya existe"
        })
    }

    const user = {
        first_name,
        last_name,
        email,
        age,
        password
    }

    let result = await userModel.create(user)
    res.send({
        status: "success",
        message: "usuario registrado"
    })
})

router.post("/login", async (req,res)=>{
    const {email, password} = req.body
    const user = await userModel.findOne({email,password})

    if(!user){
        return res.status(400).send({
            status: "error",
            error: "datos incorrectos"
        })
    }

req.session.user = {
    full_name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age
}
res.redirect("/products")

})

router.get('/logout', (req,res)=>{

    req.session.destroy(err=>{

        if(err){
            return res.status(500).send({
                status: 'error',
                error: 'No se pudo desloguear'
            })
        }
        res.redirect('/login')
    })
})

router.post("/restartPassword", async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password) return res.status(400).send(
        res.send({
            status: "error",
            message: "datos incorrectos"
        })
    )
    const user = await userModel.findOne({email})
    if(!user) return res.status(400).send(
        res.send({
            status: "error",
            message: "no existe el usuario"
        })
    )
    const newHashPassword = createHash(password)

    await userModel.updateOne({_id:user._id}, {$set:{password:newHashPassword}} )
    res.send({
        status: "success",
        message: "contrasenia restaurada"
    })
})

export default router