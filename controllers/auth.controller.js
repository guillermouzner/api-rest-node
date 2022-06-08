import { User } from "../models/user.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();

        // jwt token
        const { token, expiresIn } = generateToken(user.id);

        return res.json({ token, expiresIn });
    } catch (error) {
        // console.log(error);
        if (error.code === 11000)
            return res.status(400).json({ error: "Ya existe el usuario" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user)
            return res.status(403).json({ error: "No existe el usuario" });

        const userPassword = await user.comparePassword(password);
        if (!userPassword)
            return res.status(403).json({ error: "Contraseña incorrecta" });

        // jwt token
        const { token, expiresIn } = generateToken(user.id);

        generateRefreshToken(user.id, res);

        return res.json({ token, expiresIn, uid: user.id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({ token, expiresIn });
    } catch (error) {
        return res.status(500).json({ error: "error de server" });
    }
};

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({ email: user.email, id: user._id });
    } catch (error) {
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const logout = (_req, res) => {
    res.clearCookie("refreshToken");
    res.json({ token: "token eliminado" });
};
