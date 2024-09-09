import { app } from "@/app";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrg } from "@/utils/tests/create-and-authenticate-org";

describe("Get Pet Details controller", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("Should be able to Get Pet Details", async () => {
    const token = await createAndAuthenticateOrg(app);

    const { body } = await request(app.server)
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

    const pet = body;

    const response = await request(app.server).get(`/pet/${pet.id}`);

    await expect(response.statusCode).toEqual(200);
    await expect(response.body).toEqual({ pet });
  });
});
