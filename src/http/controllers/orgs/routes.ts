import { FastifyInstance } from "fastify";
import { registerOrg } from "./registerOrg";
import { authenticate } from "./authenticate";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", registerOrg);
  app.post("/sessions", authenticate);
}
