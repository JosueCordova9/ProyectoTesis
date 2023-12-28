import supertest from "supertest";

test("DELETE /api/delete/usuarios/17 should delete the usuario with ID 17", async () => {
    const app = require("../server");
  
    const response = await supertest(app).delete("/api/delete/usuarios/17");
  
    expect(response.status).toBe(200);
  });