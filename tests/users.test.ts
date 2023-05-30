import serviceUsers from "../src/service/serviceUsers";
import repositoriesUsers from "../src/repositories/repositoriesUsers";
import { describe, expect, jest } from "@jest/globals";
import * as dotenv from "dotenv";
dotenv.config();
describe("Users test", () => {
  it("Create User", async () => {
    jest.spyOn(repositoriesUsers, "findUser").mockResolvedValueOnce([]);
    jest.spyOn(repositoriesUsers, "insertUser").mockResolvedValueOnce([1]);

    const result = await serviceUsers.createUser("Thiago", "1234");
    expect(result).toEqual([1]);
  });
  it("Create User - Usuario já existe ", async () => {
    try {
      jest.spyOn(repositoriesUsers, "findUser").mockResolvedValueOnce([1]);
      await serviceUsers.createUser("Thiago", "1234");
    } catch (error: any) {
      expect(error.message).toBe("Usuario ja existe");
    }
  });
  it("Get password", async () => {
    jest
      .spyOn(repositoriesUsers, "selectPassword")
      .mockResolvedValueOnce([{ password: "1234" }]);
    const result = await serviceUsers.getPassword("Thiago");
    expect(result).toBe("1234");
  });
  it("Do Login", async () => {
    jest
      .spyOn(repositoriesUsers, "findUser")
      .mockResolvedValueOnce([{ id: 1 }]);
    jest.spyOn(repositoriesUsers, "selectPassword").mockResolvedValueOnce([
      {
        password:
          "$2b$10$UyJ4sNgiLKjhdiiLLfcbo.8umnasq26HQJ5/RHtZHfdTpnnUJxMru",
      },
    ]);
    const result = await serviceUsers.doLogin("Thiago", "12345");
    expect(typeof result).toBe("string");
  });

  it("Do Login - Usuario não encontrado", async () => {
    try {
      jest.spyOn(repositoriesUsers, "findUser").mockResolvedValueOnce([]);

      await serviceUsers.doLogin("Thiago2", "12345");
    } catch (error: any) {
      expect(error.message).toBe("Usuario não encontrado");
    }
  });
  it("Do Login - Senha Invalida", async () => {
    try {
      jest
        .spyOn(repositoriesUsers, "findUser")
        .mockResolvedValueOnce([{ id: 1 }]);
      jest
        .spyOn(repositoriesUsers, "selectPassword")
        .mockResolvedValueOnce([{ password: "1234" }]);
      await serviceUsers.doLogin("Thiago2", "12345");
    } catch (error: any) {
      expect(error.message).toBe("Senha inválida");
    }
  });
});
