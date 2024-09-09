import { OrgAlreadyExistsError } from "@/errors/org-already-exists-error";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterOrgUseCase } from "@/use-cases/register-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const registerUseCase = new RegisterOrgUseCase(prismaOrgsRepository);

  try {
    const registerOrgBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      whatsapp: z.string(),
      cep: z.string(),
      street: z.string(),
      number: z.string(),
      city: z.string(),
      state: z.string(),
    });

    const {
      name,
      email,
      password,
      whatsapp,
      cep,
      city,
      number,
      state,
      street,
    } = registerOrgBodySchema.parse(request.body);

    await registerUseCase.execute({
      cep,
      city,
      email,
      name,
      number,
      password_hash: password,
      state,
      street,
      whatsapp,
    });
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}
