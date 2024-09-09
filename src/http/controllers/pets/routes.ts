import { FastifyInstance } from "fastify";
import { registerPet } from "./registerPet";
import { getPetDetails } from "./getPetDetails";
import { listPestByCity } from "./listPetsByCity";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt] }, registerPet);

  app.get("/pet/:id", getPetDetails);
  app.get(`/pets`, listPestByCity);
}
