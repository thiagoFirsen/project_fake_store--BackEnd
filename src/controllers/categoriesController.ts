import { Request, Response, NextFunction } from "express";
import serviceCategories from "../service/serviceCategories";
import { Category, Name, Products, ProductFromDB } from "../types";

const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allCategories: string[] = await serviceCategories.getAllCategories();
    res.status(200).send(allCategories);
  } catch (error: any) {
    next(error);
  }
};

const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const category: Category = await serviceCategories.getCategory(id);
    res.status(200).send(category);
  } catch (error: any) {
    next(error);
  }
};

const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name }: Name = req.body;
    const newCategory: Category = await serviceCategories.createCategory(name);
    res.status(201).send(newCategory);
  } catch (error: any) {
    next(error);
  }
};

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name }: Name = req.body;
    const id: number = parseInt(req.params.id);
    const updateCategory: Category = await serviceCategories.updateCategory(
      id,
      name
    );

    res.status(200).json(updateCategory);
  } catch (error: any) {
    next(error);
  }
};
const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const deleteCategory: number = await serviceCategories.deleteCategory(id);
    res.status(200).json({ info: "Product has been deleted" });
  } catch (error: any) {
    next(error);
  }
};
const showProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category: string = req.params.category;
    const productsByCategory: ProductFromDB[] =
      await serviceCategories.getProductsByCategory(category);

    res.status(200).send(productsByCategory);
  } catch (error: any) {
    next(error);
  }
};
export default { index, show, insert, update, remove, showProductsByCategory };
