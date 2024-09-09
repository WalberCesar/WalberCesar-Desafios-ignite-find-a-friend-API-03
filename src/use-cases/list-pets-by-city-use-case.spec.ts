import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { ListPetsByCityUseCase } from "./list-pets-by-city-use-case";

let sut: ListPetsByCityUseCase;
let petsRepository: InMemoryPetsRepository;

describe("Use Case List pets by city", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new ListPetsByCityUseCase(petsRepository);
  });
  it("Should be able to List Pets by city", async () => {
    petsRepository.orgs.push({
      id: "org-01",
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

    petsRepository.orgs.push({
      id: "org-02",
      name: "kaique",
      email: "kaique@example.com",
      password_hash: "123456",
      whatsapp: "1234-1234",
      street: "honduras",
      number: "404",
      city: "santo andre",
      state: "SP",
      cep: "09310-700",
    });

    await petsRepository.create({
      name: "laila",
      description: "gorda",
      size: "medio",
      energy_level: "alta",
      independencie_level: "medio",
      environment: "grande",
      age: "adulto",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "org-01",
    });
    await petsRepository.create({
      name: "clara",
      description: "gorda",
      size: "medio",
      energy_level: "alta",
      independencie_level: "medio",
      environment: "grande",
      age: "adulto",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "org-02",
    });

    await petsRepository.create({
      name: "iris",
      description: "gorda",
      size: "medio",
      energy_level: "alta",
      independencie_level: "medio",
      environment: "grande",
      age: "adulto",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "org-02",
    });

    const { pets } = await sut.execute({
      city: "santo andre",
    });

    await expect(pets).toHaveLength(2);
    await expect(pets).toEqual([
      expect.objectContaining({
        name: "clara",
        id: "pet-01",
        description: "gorda",
        size: "medio",
        energy_level: "alta",
        independencie_level: "medio",
        environment: "grande",
        age: "adulto",
        requirements: ["gosta de carnho", "chora muito"],
        org_id: "org-02",
      }),
      expect.objectContaining({
        name: "iris",
        id: "pet-01",
        description: "gorda",
        size: "medio",
        energy_level: "alta",
        independencie_level: "medio",
        environment: "grande",
        age: "adulto",
        requirements: ["gosta de carnho", "chora muito"],
        org_id: "org-02",
      }),
    ]);
  });

  it("Should be able to List Pets by city and age", async () => {
    petsRepository.orgs.push({
      id: "org-01",
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

    await petsRepository.create({
      name: "laila",
      description: "gorda",
      size: "medio",
      energy_level: "alta",
      independencie_level: "medio",
      environment: "grande",
      age: "adulto",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "org-01",
    });
    await petsRepository.create({
      name: "clara",
      description: "gorda",
      size: "medio",
      energy_level: "alta",
      independencie_level: "medio",
      environment: "grande",
      age: "filhote",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "org-01",
    });

    await petsRepository.create({
      name: "iris",
      description: "gorda",
      size: "medio",
      energy_level: "alta",
      independencie_level: "medio",
      environment: "grande",
      age: "filhote",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "org-01",
    });

    const { pets } = await sut.execute({
      city: "maua",
      age: "filhote",
    });

    await expect(pets).toHaveLength(2);
  });

  it("Should be able to List Pets by city and energy level", async () => {
    petsRepository.orgs.push({
      id: "org-01",
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

    await petsRepository.create({
      name: "laila",
      description: "gorda",
      size: "medio",
      energy_level: "baixa",
      independencie_level: "medio",
      environment: "grande",
      age: "adulto",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "org-01",
    });

    await petsRepository.create({
      name: "iris",
      description: "gorda",
      size: "pequeno",
      energy_level: "alta",
      independencie_level: "medio",
      environment: "grande",
      age: "filhote",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "org-01",
    });

    const { pets } = await sut.execute({
      city: "maua",
      energy_level: "alta",
    });

    await expect(pets).toHaveLength(1);
  });

  it("Should be able to List Pets by city and size", async () => {
    petsRepository.orgs.push({
      id: "org-01",
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

    await petsRepository.create({
      name: "laila",
      description: "gorda",
      size: "medio",
      energy_level: "alta",
      independencie_level: "medio",
      environment: "grande",
      age: "adulto",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "org-01",
    });

    await petsRepository.create({
      name: "iris",
      description: "gorda",
      size: "pequeno",
      energy_level: "alta",
      independencie_level: "medio",
      environment: "grande",
      age: "filhote",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "org-01",
    });

    const { pets } = await sut.execute({
      size: "medio",
      city: "maua",
    });

    await expect(pets).toHaveLength(1);
  });

  it("Should be able to List Pets by city and indenpendency level", async () => {
    petsRepository.orgs.push({
      id: "org-01",
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

    await petsRepository.create({
      name: "laila",
      description: "gorda",
      size: "medio",
      energy_level: "alta",
      independencie_level: "medio",
      environment: "grande",
      age: "adulto",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "org-01",
    });

    await petsRepository.create({
      name: "iris",
      description: "gorda",
      size: "pequeno",
      energy_level: "alta",
      independencie_level: "medio",
      environment: "grande",
      age: "filhote",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "org-01",
    });

    const { pets } = await sut.execute({
      independencie_level: "medio",
      city: "maua",
    });

    await expect(pets).toHaveLength(2);
  });
});
