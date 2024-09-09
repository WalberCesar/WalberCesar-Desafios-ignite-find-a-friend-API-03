import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post("/orgs").send({
    name: "walber",
    email: "walber@example.com",
    password: "123456",
    whatsapp: "1234-1234",
    street: "honduras",
    number: "404",
    city: "maua",
    state: "SP",
    cep: "09310-700",
  });

  const orgAuthenticate = await request(app.server).post("/sessions").send({
    email: "walber@example.com",
    password: "123456",
  });

  const { token } = orgAuthenticate.body;
  return token;
}
