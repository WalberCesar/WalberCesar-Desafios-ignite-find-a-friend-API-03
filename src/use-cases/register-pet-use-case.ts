import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface RegisterPetUseCaseRequest {
  name: string;
  description: string;
  size: string;
  age: string;
  energy_level: string;
  independencie_level: string;
  environment: string;
  requirements: string[];
  org_id: string;
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    description,
    energy_level,
    environment,
    independencie_level,
    name,
    org_id,
    requirements,
    size,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      age,
      description,
      energy_level,
      environment,
      independencie_level,
      name,
      org_id,
      size,
      requirements,
    });

    return {
      pet,
    };
  }
}
