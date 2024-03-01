import passport from "passport";
import local from "passport-local"
import gitHubStrategy from "passport-github2"
import { createHash, isValidPassword, generateToken } from "../utils.js";
import userModel from "../dao/models/Users.model.js";

import Users from "../dao/dbManager/userManager.js";

const LocalStrategy = local.Strategy

const userService = new Users()

const initializePassport = async () => {
    passport.use("register", new LocalStrategy(

        {passReqToCallback:true, usernameField:"email", session: false},

        async ( req, email, password, done ) => {

        try {
            const { first_name, last_name, email, age  } = req.body;

            if(!first_name || !last_name || !email){

                return done(null,false,{message:"valores incompletos"})
            
            }

            const exist = await userService.getBy({email:email})

            if(exist){
                
                return done(null,false,{message:"el usuario ya existe"})

            }

            const hashedPassword = await createHash(password)

            const cart = await userService.saveUser();  

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                cart: cart._id,
                password: hashedPassword
            }

            
          

          

            let result = await userService.saveUser(newUser);
            const access_token = generateToken(newUser);
            return done (null, result, { access_token });
            




        } catch (error) {
            return done(error)
        }    
        }
    ));

    passport.use("login", new LocalStrategy(
        { usernameField: "email", session: false }, // Opciones
        async (email, password, done, ) => { // Función de verificación
            try {
                const user = await userService.getBy({ email });
                if (!user) {
                    return done(null, false, { message: "El usuario no existe." });
                }
    
                const passwordValidation = await isValidPassword(password, user);

              
                
    
                if (!passwordValidation) {
                    return done(null, false, { message: "La contraseña es incorrecta." });
                }
    
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser((user,done)=>{
        done(null, user._id)
    });
    passport.deserializeUser(async (id, done)=>{
        let result = await userService.findOne({_id:id})
     return done(null,result)
    });

    passport.use('github', new gitHubStrategy({
        clientID: "Iv1.4f3b14600b774256",
        clientSecret: "79ec1d46c363562ff75899e4c0bc0b1681302a7a",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"

    }, async(accesToken, refreshToken,profile, done)=>{
        try{console.log(profile)
            const first_name = profile._json.name
            let email
            if(!profile._json.email){
                 email = profile.username
            }


            let user = await userModel.findOne({email:profile._json.email});

            if(user){
                console.log('Usuario ya registrado');
                return done(null,false)
            }

            const newUser = {
                first_name,
                last_name: "",
                email,
                age: 18,
                password: ""
            }
            const result = await userModel.create(newUser);
            return done (null, result);

        } catch (error){
            return done (error)
        }

    }))
}

export default initializePassport