import { Router } from "express";
import {
    login,
    refreshToken,
    register,
    infoUser,
    logout,
} from "../controllers/auth.controller.js";

import {
    requireRefreshToken,
    validateToken,
} from "../middlewares/auth/validationsTokenManager.js";

import {
    bodyRegisterValidator,
    bodyLoginValidator,
} from "../middlewares/auth/validatorManager.js";

const router = Router();

router.post("/register", bodyRegisterValidator, register);

router.post("/login", bodyLoginValidator, login);

router.get("/refresh", requireRefreshToken, refreshToken);

router.get("/protected", validateToken, infoUser);

router.get("/logout", logout);

export default router;
