import { describe, expect, it, beforeEach } from "vitest";
import { RegisterOrgUseCase } from "./register-org-use-case";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgAlreadyExistsError } from "@/errors/org-already-exists-error";
import { compare } from "bcryptjs";

let registerOrgUseCase: RegisterOrgUseCase;
let orgsRepository: InMemoryOrgsRepository;

describe("Use Case Register Org", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    registerOrgUseCase = new RegisterOrgUseCase(orgsRepository);
  });
  it("Should be able to Register a Org", async () => {
    const { org } = await registerOrgUseCase.execute({
      name: "walber",
      email: "walber@example.com",
      password_hash: "123456",
      whatsapp: "1234-1234",
      street: "honduras",
      number: "404",
      city: "maua",
      state: "SP",
      cep: "09310-700",
    });

    expect(org.name).toEqual(expect.any(String));
  });

  it("Should not be able to Register a Org with same E-mail", async () => {
    await registerOrgUseCase.execute({
      name: "walber",
      email: "walber@example.com",
      password_hash: "123456",
      whatsapp: "1234-1234",
      street: "honduras",
      number: "404",
      city: "maua",
      state: "SP",
      cep: "09310-700",
    });

    await expect(async () => {
      await registerOrgUseCase.execute({
        name: "walber",
        email: "walber@example.com",
        password_hash: "123456",
        whatsapp: "1234-1234",
        street: "honduras",
        number: "404",
        city: "maua",
        state: "SP",
        cep: "09310-700",
      });
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });

  it("should hash user password upon registration", async () => {
    const { org } = await registerOrgUseCase.execute({
      name: "walber",
      email: "walber@example.com",
      password_hash: "123456",
      whatsapp: "1234-1234",
      street: "honduras",
      number: "404",
      city: "maua",
      state: "SP",
      cep: "09310-700",
    });

    const isPassWordCorrectlyHash = await compare("123456", org.password_hash);

    await expect(isPassWordCorrectlyHash).toBe(true);
  });
});
