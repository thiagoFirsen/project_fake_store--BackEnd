import knex, { Knex } from "knex";
import config from "./knexfile";
import { Category, ProductFromDB } from "./src/types";

const knexInstance: Knex = knex(config);

const url: string = "https://fakestoreapi.com/";

async function seedProducts() {
  const response: Response = await fetch(`${url}products`);
  const products: ProductFromDB[] = await response.json();

  await Promise.all(
    products.map(async (product) => {
      const {
        title,
        price,
        description,
        image,
        category,
        rating,
      }: ProductFromDB = product;

      const categoryId: Category = await knexInstance("categories")
        .select("id")
        .where("name", category)
        .first();

      if (!categoryId) {
        console.error(`Category not found: ${category}`);
        return;
      }

      await knexInstance("products").insert({
        title,
        price,
        description,
        image,
        category_id: categoryId.id,
        rate: rating.rate,
        count: rating.count,
      });
    })
  );

  console.log(`Inserted ${products.length} products`);
  process.exit();
}

const seedCategories = async () => {
  try {
    const response: Response = await fetch(`${url}products/categories`);
    const categories: Category[] = await response.json();

    await Promise.all(
      categories.map(async (category: any) => {
        await knexInstance("categories").insert({
          name: category,
        });
      })
    );
    console.log(`Inserted ${categories.length} categories`);
  } catch (error: any) {
    console.log(error.message);
  }
};

seedProducts();
seedCategories();
