import repositoriesCategories from "../repositories/repositoriesCategories";
import { Category } from "../types";
import { makeError } from "../Middlewares/errorHandler";

const getAllCategories = async () => {
  const categories = await repositoriesCategories.selectAllCategories();
  const categoriesFormat = categories.map((category) => category.name);
  return categoriesFormat;
};

const getCategory = async (id: number) => {
  const category = await repositoriesCategories.selectCategory(id);
  if (!category.length)
    throw makeError({ message: "Category not found", status: 400 });
  return category[0];
};

const createCategory = async (name: string): Promise<Category> => {
  const newCategory: number[] = await repositoriesCategories.insertCategory(
    name
  );
  return { id: newCategory[0], name };
};

const updateCategory = async (id: number, name: string): Promise<Category> => {
  const updateCategory = await repositoriesCategories.updateCategory(id, name);
  if (!updateCategory)
    throw makeError({ message: "Category not found", status: 400 });
  return { id, name };
};

const deleteCategory = async (id: number) => {
  const deleteCategory = await repositoriesCategories.deleteCategory(id);
  if (!deleteCategory)
    throw makeError({ message: "Category not found", status: 400 });
  return deleteCategory;
};

const getProductsByCategory = async (category: string) => {
  const findCategoryId: any = await repositoriesCategories.findCategory(
    category
  );
  if (findCategoryId.length === 0)
    throw makeError({ message: "Category not found", status: 400 });
  const productsByCategory =
    await repositoriesCategories.selectProductsByCategory(findCategoryId);
  const formatedProducts = productsByCategory.map((product: any) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: {
      rate: product.rate,
      count: product.count,
    },
  }));
  return formatedProducts;
};

export default {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
};
