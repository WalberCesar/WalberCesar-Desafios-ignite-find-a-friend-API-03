import { PrismaPestRepository } from "@/repositories/prisma/prisma-pets-repository";
import { ListPetsByCityUseCase } from "@/use-cases/list-pets-by-city-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listPestByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petsRepository = new PrismaPestRepository();
  const listPestByCityUseCase = new ListPetsByCityUseCase(petsRepository);

  const getPetDetailsParamsSchema = z.object({
    city: z.string(),
    size: z.enum(["pequeno", "medio", "grande", "gigante"]).optional(),
    energy_level: z.enum(["baixa", "media", "alta"]).optional(),
    independencie_level: z.enum(["baixo", "medio", "alto"]).optional(),
    age: z.enum(["filhote", "adulto", "idoso"]).optional(),
  });

  const { city, age, energy_level, independencie_level, size } =
    getPetDetailsParamsSchema.parse(request.query);
  const { pets } = await listPestByCityUseCase.execute({
    city,
    age,
    energy_level,
    independencie_level,
    size,
  });

  return reply.status(200).send({
    pets,
  });
}
