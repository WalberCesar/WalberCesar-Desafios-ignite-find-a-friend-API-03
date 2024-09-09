import { OrgAlreadyExistsError } from "@/errors/org-already-exists-error";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterOrgUseCaseRequest {
  name: string;
  email: string;
  password_hash: string;
  cep: string;
  street: string;
  number: string;
  city: string;
  state: string;
  whatsapp: string;
}

interface RegisterOrgUseCaseResponse {
  org: Org;
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}
  async execute({
    email,
    cep,
    city,
    number,
    state,
    street,
    name,
    password_hash,
    whatsapp,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const createPasswordHash = await hash(password_hash, 6);
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      cep,
      city,
      number,
      state,
      street,
      email,
      name,
      password_hash: createPasswordHash,
      whatsapp,
    });

    return {
      org,
    };
  }
}
