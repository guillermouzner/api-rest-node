import { body, validationResult } from "express-validator";

export const validationExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const bodyRegisterValidator = [
    body("email", "formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "La contraseña debe tener al menos 6 caracteres")
        .trim()
        .isLength({ min: 6 }),
    body("password", "Validacion con repassword").custom((value, { req }) => {
        if (value !== req.body.repassword) {
            throw new Error("Las contraseñas no coindicen");
        }
        return value;
    }),
    validationExpress,
];

export const bodyLoginValidator = [
    body("email", "formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "La contraseña debe tener al menos 6 caracteres")
        .trim()
        .isLength({ min: 6 }),
    validationExpress,
];
