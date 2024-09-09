import { app } from "@/app";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrg } from "@/utils/tests/create-and-authenticate-org";

describe("List Pets by City controller", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("Should be able to List Pets by City", async () => {
    const token = await createAndAuthenticateOrg(app);

    await request(app.server)
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

    const response = await request(app.server).get("/pets?city=maua");
    const { pets } = response.body;

    await expect(response.statusCode).toEqual(200);
    await expect(pets).toHaveLength(1);
  });
});
