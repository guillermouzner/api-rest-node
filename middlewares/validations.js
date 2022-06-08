// import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { tokenErrors } from "../utils/tokenManager.js";

// export const validationExpress = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };

export const validateToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error("Formato Bearer");
        token = token.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        // console.log(error);

        return res.status(401).json({ errors: tokenErrors[error.message] });
    }
};
