import { Router } from "express"
import userModel from "../dao/models/Users.model.js"
import jwt from "jsonwebtoken"
import { createHash, authToken, generateToken } from "../utils.js"
import passport from "passport"

const router = new Router()

router.post("/register", passport.authenticate("register", {
    passReqToCallback: true,
    session: false,
    failureRedirect: "/api/sessions/failedRegister" 
}), (req, res, { access_token }) => {
    res.send({
        status: "success",
        access_token
    })

   
});


router.get("/failedRegister", (req,res)=>{
    res.status(400).json({ message: "Fallo en el registro" });
})

router.post("/login", passport.authenticate("login",{session:false, failureRedirect:"api/sessions/failedLogin"}), (req,res)=>{
    const serializedUser = {
        id: req.user._id,
        name: `${req.user.first_name} ${req.user.last_name}`,
        role: req.user.rol,
        email:req.user.email
    }
    const token = jwt.sign(serializedUser, 'codeSecret', {expiresIn:"1h"})
    console.log(token)
    res.cookie('codeCookie',token,{maxAge:3600000}).send({
        status: "success",
        payload: serializedUser
    })
  
})

router.get("/failedLogin", (req,res)=>{
    res.status(400).json({ message: "Fallo en el login" });
})

router.get("/github", passport.authenticate("github", {scope:['user:email']}), async (req,res)=>{

})


router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), async (req,res)=>{
    req.session.user = req.user
    res.redirect("/")
})


router.get('/logout', (req,res)=>{

   try{
    req.destroy(err=>{

        if(err){
            return res.status(500).send({
                status: 'error',
                error: 'No se pudo desloguear'
            })
        }
        res.redirect('/login')
    })
    
   } catch(error){
    console.log(error)
   }
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

router.get("/api/current", authToken, (req,res)=>{
    res.send({status:"success", payload:req.user})
    
    
})




export default router