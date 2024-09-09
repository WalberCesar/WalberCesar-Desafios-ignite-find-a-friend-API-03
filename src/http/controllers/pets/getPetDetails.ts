import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { PrismaPestRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetDetailsUseCase } from "@/use-cases/get-pet-details-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petsRepository = new PrismaPestRepository();
  const getPetDetailsUseCase = new GetPetDetailsUseCase(petsRepository);

  try {
    const getPetDetailsParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getPetDetailsParamsSchema.parse(request.params);
    const { pet } = await getPetDetailsUseCase.execute({
      id,
    });

    return reply.status(200).send({
      pet,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      reply.status(409).send({ message: err.message });
    }
    throw err;
  }
}
