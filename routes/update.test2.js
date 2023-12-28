import supertest from "supertest";

test("PATCH /api/update/usuarios/16 should update the usuario with ID 16", async () => {
    const app = require("../server");
  
    const response = await supertest(app).patch("/api/update/usuarios/16").send({
      nom_usu: "Jane",
      con_usu: "Jane123",
    });
  
    expect(response.status).toBe(200);

  });