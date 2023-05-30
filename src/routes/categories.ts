import { Router } from "express";
import categoriesController from "../controllers/categoriesController";
import middleware from "../Middlewares/categoriesDataValidator";
import middlwareAuth from "../Middlewares/userHandler";

const categories: Router = Router();
const category: Router = Router();

category.get(
  "/:category",
  middleware.categoryPathNameValidator,
  categoriesController.showProductsByCategory
);

categories.get("/", categoriesController.index);

categories.get(
  "/:id",
  middleware.categoryPathValidator,
  categoriesController.show
);

categories.post(
  "/",
  middlwareAuth.verifyToken,
  middleware.categoryDataValidator,
  categoriesController.insert
);

categories.put(
  "/:id",
  middlwareAuth.verifyToken,
  middleware.categoryPathValidator,
  middleware.categoryDataValidator,
  categoriesController.update
);

categories.delete(
  "/:id",
  middlwareAuth.verifyToken,
  middleware.categoryPathValidator,
  categoriesController.remove
);

export { categories, category };
