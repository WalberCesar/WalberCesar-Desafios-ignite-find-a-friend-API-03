import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

let authenticateUseCase: AuthenticateUseCase;
let orgsRepository: InMemoryOrgsRepository;

describe("Use Case Authenticate", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    authenticateUseCase = new AuthenticateUseCase(orgsRepository);
  });
  it("Should be able to Authenticate", async () => {
    await orgsRepository.create({
      name: "walber",
      email: "walber@example.com",
      password_hash: await hash("123456", 6),
      whatsapp: "1234-1234",
      street: "honduras",
      number: "404",
      city: "maua",
      state: "SP",
      cep: "09310-700",
    });

    const { org } = await authenticateUseCase.execute({
      email: "walber@example.com",
      password: "123456",
    });

    await expect(org.name).toEqual(expect.any(String));
  });

  it("Should not be able to Authenticate with wrong email", async () => {
    await expect(async () => {
      await authenticateUseCase.execute({
        email: "walber@example.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to Authenticate with wrong password", async () => {
    await orgsRepository.create({
      name: "walber",
      email: "walber@example.com",
      password_hash: await hash("123456", 6),
      whatsapp: "1234-1234",
      street: "honduras",
      number: "404",
      city: "maua",
      state: "SP",
      cep: "09310-700",
    });
    await expect(async () => {
      await authenticateUseCase.execute({
        email: "walber@example.com",
        password: "123",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
