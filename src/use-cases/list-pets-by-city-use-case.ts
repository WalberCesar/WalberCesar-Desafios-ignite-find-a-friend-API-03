import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface listPetsByCityUseCaseRequest {
  city: string;
  age?: string;
  energy_level?: string;
  independencie_level?: string;
  size?: string;
}

interface listPetsByCityUseCaseResponse {
  pets: Pet[];
}

export class ListPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energy_level,
    independencie_level,
    size,
  }: listPetsByCityUseCaseRequest): Promise<listPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findByCity(
      city,
      age,
      energy_level,
      independencie_level,
      size,
    );
    return {
      pets,
    };
  }
}
