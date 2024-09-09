import { Prisma, Pet, Org } from "@prisma/client";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public orgs: Org[] = [];

  public items: Pet[] = [];

  async create({
    age,
    description,
    energy_level,
    environment,
    org_id,
    independencie_level,
    name,
    size,
    requirements,
  }: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: "pet-01",
      age,
      description,
      energy_level,
      environment,
      org_id,
      independencie_level,
      name,
      size,
      requirements: requirements as string[],
    };

    this.items.push(pet);

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findByCity(
    city: string,
    age: string,
    energy_level: string,
    independencie_level: string,
    size: string,
  ): Promise<Pet[]> {
    const orgsRegisteredInSpecificCity = this.orgs.filter(
      (org) => org.city === city,
    );

    const pets = this.items
      .filter((item) =>
        orgsRegisteredInSpecificCity.some((org) => org.id === item.org_id),
      )
      .filter((item) => (age ? item.age === age : true))
      .filter((item) =>
        energy_level ? item.energy_level === energy_level : true,
      )
      .filter((item) =>
        independencie_level
          ? item.independencie_level === independencie_level
          : true,
      )
      .filter((item) => (size ? item.size === size : true));

    return pets;
  }
}
