import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseRsponse {
  org: Org;
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseRsponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, org.password_hash);

    if (doesPasswordMatch === false) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    };
  }
}
