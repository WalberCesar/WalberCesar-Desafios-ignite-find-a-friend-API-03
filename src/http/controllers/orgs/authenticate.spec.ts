import { app } from "@/app";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import request from "supertest";

describe("Authenticate  controller", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("Should be able to authenticate", async () => {
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

    const response = await request(app.server).post("/sessions").send({
      email: "walber@example.com",
      password: "123456",
    });

    await expect(response.statusCode).toEqual(200);
    await expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
