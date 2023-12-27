import { json } from "body-parser";
import supertest from "supertest";

test("GET /api/read/usuarios should return a list of usuarios", async () => {
  const app = require("../server");

  const response = await supertest(app).get("/api/read/usuarios");

  expect(response.status).toBe(200);
  expect(response.body.data.length).not.toBe(0);
});

test("GET /api/read/estudiantes should return a list of estudiantes", async () => {
    const app = require("../server");
  
    const response = await supertest(app).get("/api/read/estudiantes");
  
    expect(response.status).toBe(200);
    expect(response.body.data.length).not.toBe(0);
  });

  test("GET /api/read/roles should return a list of roles", async () => {
    const app = require("../server");
  
    const response = await supertest(app).get("/api/read/roles");
  
    expect(response.status).toBe(200);
    expect(response.body.data.length).not.toBe(0);
  });

  test("GET /api/read/lectivos should return a list of lectivos", async () => {
    const app = require("../server");
  
    const response = await supertest(app).get("/api/read/lectivos");
  
    expect(response.status).toBe(200);
    expect(response.body.data.length).not.toBe(0);
  });

  test("GET /api/read/periodos should return a list of periodos", async () => {
    const app = require("../server");
  
    const response = await supertest(app).get("/api/read/periodos");
  
    expect(response.status).toBe(200);
    expect(response.body.data.length).not.toBe(0);
  });

  test("GET /api/read/etnias should return a list of etnias", async () => {
    const app = require("../server");
  
    const response = await supertest(app).get("/api/read/etnias");
  
    expect(response.status).toBe(200);
    expect(response.body.data.length).not.toBe(0);
  });

  test("GET /api/read/provincias should return a list of provincias", async () => {
    const app = require("../server");
  
    const response = await supertest(app).get("/api/read/provincias");
  
    expect(response.status).toBe(200);
    expect(response.body.data.length).not.toBe(0);
  });

  test("GET /api/read/cursos should return a list of cursos", async () => {
    const app = require("../server");
  
    const response = await supertest(app).get("/api/read/cursos");
  
    expect(response.status).toBe(200);
    expect(response.body.data.length).not.toBe(0);
  });

  test("GET /api/read/docentes should return a list of docentes", async () => {
    const app = require("../server");
  
    const response = await supertest(app).get("/api/read/docentes");
  
    expect(response.status).toBe(200);
    expect(response.body.data.length).not.toBe(0);
  });

  test("GET /api/read/paralelos should return a list of paralelos", async () => {
    const app = require("../server");
  
    const response = await supertest(app).get("/api/read/paralelos");
  
    expect(response.status).toBe(200);

  });