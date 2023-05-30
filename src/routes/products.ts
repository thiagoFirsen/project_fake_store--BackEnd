import { Router } from "express";
import productsController from "../controllers/productsController";
import { categories, category } from "./categories";
import middleware from "../Middlewares/productDataValidator";
import middlwareAuth from "../Middlewares/userHandler";

const router: Router = Router();

router.use("/categories", categories);

router.use("/category", category);

router.get("/", productsController.index);

router.get("/bestSelling", productsController.indexTop3);

router.get("/:id", middleware.productPathValidator, productsController.show);

router.post(
  "/",
  middlwareAuth.verifyToken,
  middleware.productDataValidator,
  productsController.insert
);

router.put(
  "/:id",
  middlwareAuth.verifyToken,
  middleware.productPathValidator,
  middleware.productDataValidator,
  productsController.update
);

router.patch(
  "/:id",
  middlwareAuth.verifyToken,
  middleware.productPathValidator,
  middleware.partialProductValidator,
  productsController.partiallyUpdate
);

router.delete(
  "/:id",
  middlwareAuth.verifyToken,
  middleware.productPathValidator,
  productsController.remove
);

export { router };
