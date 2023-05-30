type Category = {
  id?: number;
  name: string;
};
type Name = {
  name: string;
};

interface ProductsDefault {
  id?: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category?: string;
  category_id?: number;
}

type ProductFromDB = {
  id?: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category?: string;
  category_id?: number;
  rating: { rate: number; count: number };
};

interface Products extends ProductsDefault {
  rate: number;
  count: number;
}

type ErrorType = {
  message: string;
  status: number;
  stack?: string;
};

export { Category, Name, ProductFromDB, Products, ErrorType };
