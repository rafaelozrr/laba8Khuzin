import { User } from "../models.js";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mailService from '../mailService.js'


const getToken = (id, email)=>{
    return jwt.sign({id, email}, String(process.env.PRIVATEKEY), {expiresIn:'10h'})
}

class UserController {

    async registration(req, res, next){
        console.log(req.body)
        const {email, password, first_name, last_name, avatar} = req.body
        if (!email || !password){
            return next(Error("Не корректно указаны email или password"))
        }


        const visiter = await User.findOne({where:{
            email:email
        }})
        if (visiter){
            return next(Error("Пользователь с таким email уже зарегистрирован"))
        }
        // console.log("Пользователь зареган")
        const activationLink = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 3)
        const newUser = await User.create({
            email:email,
            password:hashedPassword,
            first_name:first_name,
            last_name:last_name,
            avatar:avatar,
            activationLink:activationLink,
            activeted: false

        })

      

        mailService.sendActivationLink(newUser.email, `http://${process.env.HOST}:${process.env.PORT}/api/users/activate/${activationLink}`)

        const token = getToken(newUser.id, newUser.email)


        res.json(token)

        

    }
    async login(req, res, next){
        console.log(req.body)

        const {email, password} = req.body
        const visiter = await User.findOne({where:{
            email:email
        }})

        if(!visiter) {
            return next(Error("Пользователь с данным email не зарегистрирован"))
        }


        const comprasion = bcrypt.compareSync(password, visiter.password)

        if (!comprasion){
            return next(Error("Вы ввели не верный пароль"))
        }

        const token = getToken(visiter.id, visiter.email)

        res.json(token)
    }

    async activate(req, res, next){
        const activationLink = req.params.link 
        const user = await User.findOne({where:{activationLink:activationLink}})
        user.activeted = true
        user?.save()
        res.json(user)
        console.log("activated")

    }

    async check(req, res, next){

        res.json({message:"ALL correct!"})
    }
    
    async create(req, res) {


        
        try {
            console.log('path.resolve:', path.resolve());

            const { photo } = req.files;
            const photoFileName = uuidv4() + path.extname(photo.name);
            const uploadPath = path.resolve(path.resolve(), 'uploads', photoFileName);


            await photo.mv(uploadPath);

            const { email, first_name, last_name, avatar } = req.body;
            const user = await User.create({
                email,
                first_name,
                last_name,
                avatar: '/uploads/' + photoFileName
            });

            
            res.status(201).json(user);
        } catch (err) {
            console.error('Ошибка при создании:', err);
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getOne(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: "User not found" });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { email, first_name, last_name, avatar } = req.body;

            const updatedUser = { email, first_name, last_name, avatar };
            const user = await User.update(updatedUser, {
                where: {
                    id: req.body.id
                }
            });

            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {

            const user = await User.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export const userController = new UserController();