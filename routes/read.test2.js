import supertest from "supertest";

test("GET /api/read/usuarios should return a list of usuarios", async () => {
  const app = require("../server");

  const response = await supertest(app).get("/api/read/usuarios");

  expect(response.status).toBe(200);
  expect(response.body.data.length).not.toBe(0);
});
