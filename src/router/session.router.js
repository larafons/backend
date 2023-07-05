import { Router } from "express";
import userModel from "../daos/models/user.model.js";

const router = Router();

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const exists = await userModel.findOne({ email });

    if (exists)
        return res
        .status(400)
        .send({ status: "error", message: "usuario ya registrado" });

    let result = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password,
    });
    res.send({ status: "success", message: "usuario  registrado" });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email, password: password });
    console.log(user)
    if (!user) {
        return res.redirect('/api/login')
    }
    req.session.user = {
        name: user.first_name+" "+user.last_name,
        email: user.email,
        age: user.age,
        rol: user.rol,
    };
    res.send({ status: "success", message: req.session.user });
});

export default router