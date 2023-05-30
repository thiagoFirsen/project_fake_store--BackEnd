import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";
import { Category, Products } from "../types";

const knexInstance: Knex = knex(config);

const selectAllCategories = (): Promise<Array<Category>> =>
  knexInstance("categories").select("*");

const selectCategory = (id: number): Promise<Array<Category>> =>
  knexInstance("categories").select("*").where({ "categories.id": id });

const insertCategory = (name: string): Promise<Array<number>> =>
  knexInstance("categories").insert({
    name,
  });

const updateCategory = (id: number, name: string): Promise<number> =>
  knexInstance("categories").update({ name }).where({ id });

const deleteCategory = (id: number): Promise<number> =>
  knexInstance("categories").delete().where({ id });

const findCategory = (category: string): Promise<Array<number>> =>
  knexInstance("categories").select("id").where({ name: category });

const selectProductsByCategory = (
  categoryId: number
): Promise<Array<Products>> => {
  return knexInstance("products")
    .select(
      "products.id",
      "products.title",
      "products.price",
      "products.description",
      "products.image",
      "categories.name as category ",
      "products.rate",
      "products.count"
    )
    .join("categories", "categories.id", "=", "products.category_id")
    .where({ "products.category_id": categoryId });
};

export default {
  selectAllCategories,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  findCategory,
  selectProductsByCategory,
};
