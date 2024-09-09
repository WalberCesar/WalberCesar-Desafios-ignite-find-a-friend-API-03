import { PrismaPestRepository } from "@/repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "@/use-cases/register-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const registerPetBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  size: z.enum(["pequeno", "medio", "grande", "gigante"]),
  energy_level: z.enum(["baixa", "media", "alta"]),
  independencie_level: z.enum(["baixo", "medio", "alto"]),
  environment: z.enum(["pqueno", "medio", "grande"]),
  age: z.enum(["filhote", "adulto", "idoso"]),
  requirements: z.string().array(),
});

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify();

  const petsRepository = new PrismaPestRepository();
  const registerPetsUsCase = new RegisterPetUseCase(petsRepository);

  const {
    age,
    description,
    energy_level,
    environment,

    independencie_level,
    name,
    size,
    requirements,
  } = registerPetBodySchema.parse(request.body);

  const org_id = request.user.sub;

  try {
    const { pet } = await registerPetsUsCase.execute({
      age,
      description,
      energy_level,
      environment,
      org_id,
      independencie_level,
      name,
      size,
      requirements,
    });

    return reply.status(201).send(pet);
  } catch (err) {
    throw new Error();
  }
}
