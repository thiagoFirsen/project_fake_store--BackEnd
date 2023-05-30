import { NextFunction, Request, Response } from "express";
import { object, string, number } from "yup";

const hasTrueStrict = { strict: true };

const productPathValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pathProduct = parseInt(req.params.id);
    const pathProductSchema = number().required("Id é obrigatorio");
    await pathProductSchema.validate(pathProduct, hasTrueStrict);
    next();
  } catch (error) {
    next(error);
  }
};

const productDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;

    const productSchema = object({
      title: string().required("Título é obrigatorio"),
      price: number().required("Preço é obrigatorio"),
      description: string().required("Descrição é obrigatorio"),
      category: string().required("Categoria é obrigatorio"),
      image: string().required("Imagem é obrigatorio"),
      rating: object({
        rate: number().required("Rate é obrigatorio"),
        count: number().required("Count é obrigatorio"),
      }).required("Rating é obrigatorio"),
    });

    await productSchema.validate(productData, hasTrueStrict);
    next();
  } catch (error) {
    next(error);
  }
};

const partialProductValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;

    const productSchema = object({
      title: string(),
      price: number(),
      description: string(),
      category: string(),
      image: string(),
      rating: object({
        rate: number(),
        count: number(),
      }),
    });

    await productSchema.validate(productData, hasTrueStrict);
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  productPathValidator,
  productDataValidator,
  partialProductValidator,
};
