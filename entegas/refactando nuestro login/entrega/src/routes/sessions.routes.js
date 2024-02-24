import { Router } from "express"
import userModel from "../models/Users.model.js"
import { createHash, validatePassword } from "../utils.js"
import passport from "passport"


const router = new Router()

router.post("/register",passport.authenticate("register", {failureRedirect:"/api/sessions/failregister"}),
async (req,res) =>{
    res.send({
        status: "success",
        message: 'User registrado'
    })
}
)
router.get("/failregister", async (req,res)=>{
    console.log('fallo el registro')
    res.send({
        status: "error",
        error: "fallo en el registro"
    })
})

router.post("/login",passport.authenticate("login", {failureRedirect:"/api/sessions/faillogin"}),
async (req,res) =>{
    if(!req.res){
        return res.status(400).send({
            status: "error"
        })
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    res.send({
        status: "success",
        payload: req.user
    })
  
})

router.get("/faillogin", async (req,res)=>{
    res.send({
        error: "fallo en el login"
    })
})

router.get("/github", passport.authenticate("github", {scope:['user:email']}), async (req,res)=>{})


router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), async (req,res)=>{
    req.session.user = req.user
    res.redirect("/")
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