import serviceCategories from "../src/service/serviceCategories";
import repositoriesCategories from "../src/repositories/repositoriesCategories";
import { describe, expect, jest } from "@jest/globals";
import { paramsFromDB } from "./mocksProducts";

describe("Categories Tests", () => {
  it("Read All Categories", async () => {
    jest
      .spyOn(repositoriesCategories, "selectAllCategories")
      .mockResolvedValueOnce([]);
    const result = await serviceCategories.getAllCategories();
    expect(Array.isArray(result)).toBe(true);
  });
  it("Read Category", async () => {
    jest
      .spyOn(repositoriesCategories, "selectCategory")
      .mockResolvedValueOnce([{ id: 1, name: "electronics" }]);
    const result = await serviceCategories.getCategory(1);
    expect(result).toMatchObject({ id: 1, name: "electronics" });
  });
  it("Category does not exist - get", async () => {
    try {
      jest
        .spyOn(repositoriesCategories, "selectCategory")
        .mockResolvedValueOnce([]);

      await serviceCategories.getCategory(1);
    } catch (error: any) {
      expect(error.message).toBe("Category not found");
    }
  });
  it("Create a Category", async () => {
    jest
      .spyOn(repositoriesCategories, "insertCategory")
      .mockResolvedValueOnce([1]);

    const result = await serviceCategories.createCategory("electronics");
    expect(result).toMatchObject({ id: 1, name: "electronics" });
  });
  it("Update Category", async () => {
    jest
      .spyOn(repositoriesCategories, "updateCategory")
      .mockResolvedValueOnce(1);

    const result = await serviceCategories.updateCategory(1, "electronics");
    expect(result).toMatchObject({ id: 1, name: "electronics" });
  });
  it("Category does not exist - update", async () => {
    try {
      jest
        .spyOn(repositoriesCategories, "updateCategory")
        .mockResolvedValueOnce(0);

      await serviceCategories.updateCategory(456, "electronics");
    } catch (error: any) {
      expect(error.message).toBe("Category not found");
    }
  });
  it("Delete Category", async () => {
    jest
      .spyOn(repositoriesCategories, "deleteCategory")
      .mockResolvedValueOnce(1);

    const result = await serviceCategories.deleteCategory(456);
    expect(result).toBe(1);
  });
  it("Category does not exist - delete", async () => {
    try {
      jest
        .spyOn(repositoriesCategories, "deleteCategory")
        .mockResolvedValueOnce(0);

      await serviceCategories.deleteCategory(456);
    } catch (error: any) {
      expect(error.message).toBe("Category not found");
    }
  });
  it("Get Products By Category", async () => {
    jest
      .spyOn(repositoriesCategories, "findCategory")
      .mockResolvedValueOnce([1]);
    jest
      .spyOn(repositoriesCategories, "selectProductsByCategory")
      .mockResolvedValueOnce([paramsFromDB]);

    const result = await serviceCategories.getProductsByCategory("electronics");
    expect(Array.isArray(result)).toBe(true);
  });
  it("Category does not exist - Get Products By Category", async () => {
    try {
      jest
        .spyOn(repositoriesCategories, "findCategory")
        .mockResolvedValueOnce([]);
      jest
        .spyOn(repositoriesCategories, "selectProductsByCategory")
        .mockResolvedValueOnce([]);

      await serviceCategories.getProductsByCategory("electronics");
    } catch (error: any) {
      expect(error.message).toBe("Category not found");
    }
  });
});
