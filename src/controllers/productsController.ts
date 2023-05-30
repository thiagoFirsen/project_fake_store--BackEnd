import { NextFunction, Request, Response } from "express";
import serviceProducts from "../service/serviceProducts";
import { ProductFromDB, Products } from "../types";

const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allProducts: ProductFromDB[] = await serviceProducts.getAllProducts();
    res.status(200).send(allProducts);
  } catch (error: any) {
    next(error);
  }
};

const indexTop3 = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const top3Producs: ProductFromDB[] =
      await serviceProducts.getTop3Products();
    res.status(200).send(top3Producs);
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
    const product: ProductFromDB = await serviceProducts.getProduct(id);
    res.status(200).send(product);
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
    const {
      title,
      price,
      description,
      category,
      image,
      rating,
    }: ProductFromDB = req.body;
    const product: ProductFromDB = {
      title,
      price,
      description,
      category,
      image,
      rating,
    };
    const insertProduct = await serviceProducts.postProduct(product);
    res.send(insertProduct);
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
    const id: number = parseInt(req.params.id);
    const {
      title,
      price,
      description,
      category,
      image,
      rating,
    }: ProductFromDB = req.body;

    const product: ProductFromDB = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    };
    await serviceProducts.updateProduct(id, product);

    res.status(200).send({ id: id, ...product });
  } catch (error: any) {
    next(error);
  }
};

const partiallyUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const product: any = req.body;
    const updateProduct: ProductFromDB =
      await serviceProducts.partiallyUpdateProduct(id, product);
    res.status(200).send(updateProduct);
  } catch (error) {
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
    const deleteProduct: number = await serviceProducts.deleteProduct(id);
    res.status(200).json({ info: "Product has been deleted" });
  } catch (error: any) {
    next(error);
  }
};

export default {
  index,
  indexTop3,
  show,
  insert,
  update,
  remove,
  partiallyUpdate,
};
