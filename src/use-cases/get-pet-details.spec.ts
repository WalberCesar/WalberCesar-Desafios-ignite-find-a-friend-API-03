import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { GetPetDetailsUseCase } from "./get-pet-details-use-case";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

let sut: GetPetDetailsUseCase;
let petsRepository: InMemoryPetsRepository;

describe("Use Case Get Pet Details Pet", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetDetailsUseCase(petsRepository);
  });
  it("Should be able to Get Pet Details", async () => {
    await petsRepository.create({
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

    const { pet } = await sut.execute({
      id: "pet-01",
    });

    await expect(pet.id).toEqual(expect.any(String));
    await expect(pet.name).toEqual("laila");
  });

  it("Should not be able to Get Pet Details with wrong id", async () => {
    await expect(async () => {
      await sut.execute({
        id: "no-existing-id",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
