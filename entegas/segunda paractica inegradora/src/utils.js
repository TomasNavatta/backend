import { fileURLToPath} from "url"
import { dirname } from "path"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const PRIVATE_KEY = "CoderKeyFeliz"

export const generateToken = (user) =>{
    const token = jwt.sign({user}, PRIVATE_KEY,{expiresIn:"1d"})
    return token
}

export const authToken = (req,res,next) => {

    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    if(token === "null"){
        return res.status(401).send({status:"error", error: 'no autorizado'})
    }
    jwt.verify(token,PRIVATE_KEY,(error,credentials)=>{
        console.log(error)
        if(error){
            return res.status(401).send({status:"error", error: 'no autorizado'})

        }
        req.user = credentials.user
        next()

    })

}


export const createHash = async (password) =>{
    const salts = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salts)

} 
export const isValidPassword = (password, user) => bcrypt.compare(password, user.password)



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export default __dirname
