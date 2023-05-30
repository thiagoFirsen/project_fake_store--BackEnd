import { NextFunction, Request, Response } from "express";
import { object, string, number } from "yup";
const hasTrueStrict = { strict: true };

const categoryPathValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pathCategory = req.params;
    const pathCategorySchema = object({
      id: string().required("Id é obrigatorio"),
    });
    await pathCategorySchema.validate(pathCategory, hasTrueStrict);
    next();
  } catch (error) {
    next(error);
  }
};
const categoryPathNameValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pathCategory = req.params;
    const pathCategorySchema = object({
      category: string().required("Categoria é obrigatorio"),
    });
    await pathCategorySchema.validate(pathCategory, hasTrueStrict);
    next();
  } catch (error) {
    next(error);
  }
};
const categoryDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryData = req.body;

    const categorySchema = object({
      name: string().required("Nome da nova categoria é obrigatoria"),
    });

    await categorySchema.validate(categoryData, hasTrueStrict);
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  categoryPathNameValidator,
  categoryPathValidator,
  categoryDataValidator,
};
