import { app } from "@/app";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrg } from "@/utils/tests/create-and-authenticate-org";

describe("Register Pet controller", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("Should be able to registe Pet", async () => {
    const token = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "laila",
        description: "gorda",
        size: "medio",
        energy_level: "alta",
        independencie_level: "medio",
        environment: "grande",
        age: "adulto",
        requirements: ["gosta de carnho", "chora muito"],
      });

    await expect(response.statusCode).toEqual(201);
  });
});
