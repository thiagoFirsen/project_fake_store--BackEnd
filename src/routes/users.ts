import { Router } from "express";
import usersController from "../controllers/usersController";
import middleware from "../Middlewares/userHandler";

const router: Router = Router();

router.post("/register", middleware.doCripto, usersController.insert);
router.post("/login", usersController.verifyPassword);

export { router };
