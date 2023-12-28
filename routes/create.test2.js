import supertest from "supertest";

test("POST /api/create/usuarios should create a new usuario", async () => {
    const app = require("../server");
  
    const response = await supertest(app).post("/api/create/usuarios").send({
      usuario: "JohnDoe",
      nom_usu: "John",
      ape_usu: "Doe",
      con_usu: "John123",
      id_rol_per: 2,
    });
  
    expect(response.status).toBe(200);
  });