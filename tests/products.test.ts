import serviceProducts from "../src/service/serviceProducts";
import repositoriesProducts from "../src/repositories/repositoriesProducts";
import { describe, expect, jest } from "@jest/globals";
import { params, paramsFromDB } from "./mocksProducts";

describe("Products Tests", () => {
  it("Read All Products", async () => {
    jest
      .spyOn(repositoriesProducts, "selectAllProducts")
      .mockResolvedValueOnce([]);

    const result = await serviceProducts.getAllProducts();
    expect(Array.isArray(result)).toBe(true);
  });
  it("Read Product", async () => {
    jest
      .spyOn(repositoriesProducts, "selectProduct")
      .mockResolvedValueOnce([paramsFromDB]);
    jest;
    const result = await serviceProducts.getProduct(1);
    expect(result).toMatchObject({ ...params, id: 1 });
  });
  it("Product does not exist - get", async () => {
    try {
      jest
        .spyOn(repositoriesProducts, "selectProduct")
        .mockResolvedValueOnce([]);

      await serviceProducts.getProduct(0);
    } catch (error: any) {
      expect(error.message).toBe("Product not found");
    }
  });
  it("Create a Product", async () => {
    jest
      .spyOn(repositoriesProducts, "selectProductCategory")
      .mockResolvedValueOnce([{ id: 3 }]);
    jest
      .spyOn(repositoriesProducts, "insertProduct")
      .mockResolvedValueOnce([28]);
    const result = await serviceProducts.postProduct(params);
    expect(result).toMatchObject({ ...params, id: 28 });
  });
  it("Category does not exist - put", async () => {
    try {
      jest
        .spyOn(repositoriesProducts, "selectProductCategory")
        .mockResolvedValueOnce([]);

      await serviceProducts.postProduct(params);
    } catch (error: any) {
      expect(error.message).toBe("Category not found");
    }
  });
  it("Update a Product", async () => {
    jest
      .spyOn(repositoriesProducts, "selectProductCategory")
      .mockResolvedValueOnce([{ id: 3 }]);
    jest.spyOn(repositoriesProducts, "updateProduct").mockResolvedValueOnce(28);
    const result = await serviceProducts.updateProduct(28, params);
    expect(result).toBe(28);
  });
  it("Category does not exist - update", async () => {
    try {
      jest
        .spyOn(repositoriesProducts, "selectProductCategory")
        .mockResolvedValueOnce([]);
      await serviceProducts.updateProduct(28, params);
    } catch (error: any) {
      expect(error.message).toBe("Category not found");
    }
  });
  it("Product does not exist - update", async () => {
    try {
      jest
        .spyOn(repositoriesProducts, "selectProductCategory")
        .mockResolvedValueOnce([{ id: 3 }]);
      jest
        .spyOn(repositoriesProducts, "updateProduct")
        .mockResolvedValueOnce(0);
      await serviceProducts.updateProduct(28, params);
    } catch (error: any) {
      expect(error.message).toBe("Product not found");
    }
  });

  it("Update a Product Partially", async () => {
    jest
      .spyOn(repositoriesProducts, "selectProductCategory")
      .mockResolvedValueOnce([{ id: 3 }]);
    jest.spyOn(repositoriesProducts, "updateProduct").mockResolvedValueOnce(28);
    jest
      .spyOn(repositoriesProducts, "selectProduct")
      .mockResolvedValueOnce([paramsFromDB]);
    const result = await serviceProducts.partiallyUpdateProduct(28, params);
    expect(result).toMatchObject(params);
  });
  it("Category does not exist - patch", async () => {
    try {
      jest
        .spyOn(repositoriesProducts, "selectProductCategory")
        .mockResolvedValueOnce([]);
      await serviceProducts.partiallyUpdateProduct(28, params);
    } catch (error: any) {
      expect(error.message).toBe("Categoria não existe");
    }
  });
  it("Delete Product", async () => {
    jest.spyOn(repositoriesProducts, "deleteProduct").mockResolvedValueOnce(1);

    const result = await serviceProducts.deleteProduct(456);
    expect(result).toBe(1);
  });
  it("Product does not exist - delete", async () => {
    try {
      jest
        .spyOn(repositoriesProducts, "deleteProduct")
        .mockResolvedValueOnce(0);

      await serviceProducts.deleteProduct(456);
    } catch (error: any) {
      expect(error.message).toBe("Product not found");
    }
  });
});
