import { describe, it, beforeEach, expect } from "vitest";
import { RegisterPetUseCase } from "./register-pet-use-case";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

let sut: RegisterPetUseCase;
let petsRepository: InMemoryPetsRepository;

describe("Use Case Register Pet", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new RegisterPetUseCase(petsRepository);
  });
  it("Should be able to Register a Pet", async () => {
    const { pet } = await sut.execute({
      name: "laila",
      description: "gorda",
      size: "medio",
      energy_level: "alta",
      independencie_level: "medio",
      environment: "grande",
      age: "adulto",
      requirements: ["gosta de carnho", "chora muito"],
      org_id: "or-01",
    });

    await expect(pet.id).toEqual(expect.any(String));
  });
});
