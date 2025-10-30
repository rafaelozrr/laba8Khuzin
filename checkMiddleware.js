import jwt from 'jsonwebtoken'


export const checkMiddelware = (req, res, next) =>{
    if (req.method === 'OPTION'){
        next()
    }

    try{

        const token = req.headers.authorization.split(' ')[1]
        if (!token){
        return res.status(401).json({message:"Пользователь не авторизован!"})
        }

        console.log('private key:', process.env.PRIVATEKEY)
        const decod = jwt.verify(token, process.env.PRIVATEKEY)
        console.log('decod:', decod)
        next()

    }catch{
        res.status(401).json({message:"Пользователь не авторизован!"})



    }


}