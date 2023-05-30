import { router as productsRoutes } from "./products";
import { router as userRoutes } from "./users";
import { Router } from "express";

const router: Router = Router();

router.use("/users", userRoutes);
router.use("/products", productsRoutes);

export { router };
