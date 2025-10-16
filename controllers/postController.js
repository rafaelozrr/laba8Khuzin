import { Post } from "../models.js"; // предполагается, что у тебя есть модель Post
import { v4 as uuidv4 } from 'uuid';

class PostController {
    
    async create(req, res) {
        try {
            const { title, body } = req.body;


            const newPost = await Post.create({
                title,
                body
            });

            res.status(201).json(newPost);
        } catch (err) {
            console.error('Ошибка при создании поста:', err);
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const posts = await Post.findAll();
            res.json(posts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    async getOne(req, res) {
        try {
            const post = await Post.findByPk(req.params.id);
            if (!post) return res.status(404).json({ error: "Post not found" });
            res.json(post);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { title, body } = req.body;
            const updatedPost = { title, body };

            const result = await Post.update(updatedPost, {
                where: { id: req.body.id }
            });

            res.status(201).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await Post.destroy({
                where: { id: req.params.id }
            });

            res.json({ deleted: result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

export const postController = new PostController();