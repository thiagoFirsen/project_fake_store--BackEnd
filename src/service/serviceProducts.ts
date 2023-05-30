import repositoriesProducts from "../repositories/repositoriesProducts";
import { makeError } from "../Middlewares/errorHandler";
import { Products, ProductFromDB, Category } from "../types";

const getAllProducts = async (): Promise<ProductFromDB[]> => {
  const products: Products[] = await repositoriesProducts.selectAllProducts();
  const formatedProducts: ProductFromDB[] = products.map((product) => ({
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

const getTop3Products = async (): Promise<ProductFromDB[]> => {
  const products: Products[] = await repositoriesProducts.selectAllProducts();
  const formatedProducts: ProductFromDB[] = products.map((product) => ({
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
  formatedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  return formatedProducts.slice(0, 3);
};

const getProduct = async (id: number): Promise<ProductFromDB> => {
  const product: Products[] = await repositoriesProducts.selectProduct(id);
  const formatedProducts: ProductFromDB[] = product.map((product) => ({
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
  if (!product.length)
    throw makeError({ message: "Product not found", status: 400 });
  return formatedProducts[0];
};

const postProduct = async (product: ProductFromDB): Promise<ProductFromDB> => {
  const { category, rating, ...data }: ProductFromDB = product;

  const categoryId: any = await repositoriesProducts.selectProductCategory(
    category
  );
  if (!categoryId[0])
    throw makeError({ message: "Category not found", status: 400 });

  const formatedProduct: Products = {
    ...data,
    category_id: categoryId[0].id,
    rate: rating.rate,
    count: rating.count,
  };
  const insertProduct: number[] = await repositoriesProducts.insertProduct(
    formatedProduct
  );
  const productPosted = { id: insertProduct[0], ...product };

  return productPosted;
};

const updateProduct = async (id: any, product: any): Promise<number> => {
  const { category, rating, ...data }: ProductFromDB = product;
  const selectedCategory = await repositoriesProducts.selectProductCategory(
    category
  );
  if (selectedCategory.length === 0) {
    throw makeError({ message: "Category not found", status: 400 });
  }

  const categoryId = await selectedCategory[0].id;

  const updateProduct: Products = {
    ...data,
    category_id: categoryId,
    rate: rating.rate,
    count: rating.count,
  };

  const productId: number = await repositoriesProducts.updateProduct(
    id,
    updateProduct
  );

  if (!productId)
    throw makeError({ message: "Product not found", status: 400 });
  return productId;
};

const partiallyUpdateProduct = async (
  id: number,
  product: any
): Promise<ProductFromDB> => {
  const newProduct: any = { ...product, ...product.rating };
  delete newProduct.rating;
  delete newProduct.category;

  let categoryId: number | undefined;
  if (product.category) {
    const category = await repositoriesProducts.selectProductCategory(
      product.category
    );
    if (category.length === 0) {
      throw makeError({ message: "Categoria não existe", status: 400 });
    }

    categoryId = category[0].id;
  }

  await repositoriesProducts.updateProduct(id, {
    ...newProduct,
    category_id: product.category ? categoryId : undefined,
  });
  const productFromDatabase: Products[] =
    await repositoriesProducts.selectProduct(id);

  const { rate, count, ...dataProduct }: Products = productFromDatabase[0];

  const formatedProduct: ProductFromDB = {
    ...dataProduct,
    rating: {
      rate: productFromDatabase[0].rate,
      count: productFromDatabase[0].count,
    },
  };

  return formatedProduct;
};

const deleteProduct = async (id: any): Promise<number> => {
  const product: number = await repositoriesProducts.deleteProduct(id);
  if (!product) throw makeError({ message: "Product not found", status: 400 });
  return product;
};

export default {
  getAllProducts,
  getTop3Products,
  getProduct,
  postProduct,
  updateProduct,
  partiallyUpdateProduct,
  deleteProduct,
};
