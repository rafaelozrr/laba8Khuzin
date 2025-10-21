import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { seq } from "./db.js";
import { router } from "./routes/index.js";
import fileUpload from "express-fileupload";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(fileUpload({}));
app.use("/api", router);

console.log('переменная окружения name:', process.env.NAME);

app.get('/testerror', (req, res) => {
    throw new Error("Это тест");
});



seq.authenticate()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error("Database error:", err));

seq.sync({ alter: true })
    .then(() => console.log("Database synchronized"))
    .catch((err) => console.error("Sync error:", err));


app.use((err, req, res, next) => {
    console.error(err.message); 
    res.status(500).json({ message: err.message }); 
    next()
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));