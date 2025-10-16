import { User } from "../models.js";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

class UserController {
    
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