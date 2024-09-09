import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findByCity(
    city?: string,
    age?: string,
    energy_level?: string,
    independencie_level?: string,
    size?: string,
  ): Promise<Pet[]>;
}
