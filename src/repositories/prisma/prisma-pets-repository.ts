import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPestRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    if (!pet) {
      return null;
    }

    return pet;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findByCity(
    city: string,
    age?: string,
    energy_level?: string,
    independencie_level?: string,
    size?: string,
  ): Promise<Pet[]> {
    const petsByCity = await prisma.pet.findMany({
      where: {
        org: {
          city,
        },
        age,
        independencie_level,
        energy_level,
        size,
      },
    });

    return petsByCity;
  }
}
