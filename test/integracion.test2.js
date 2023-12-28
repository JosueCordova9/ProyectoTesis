import supertest from "supertest";
import app from "../server";

describe('POST /api/create/lectivos', () => {
    it('Should create a new lectivo', async () => {
      const response = await supertest(app)
        .post('/api/create/lectivos')
        .send({ nom_año: '2024 - 2025' });

      expect(response.status).toBe(200);
    });
  });

describe('GET /api/read/lectivos', ()=>{
    it('Should return a list of lectivos', async () => {
        const response = await supertest(app).get('/api/read/lectivos');

        expect(response.status).toBe(200);
        expect(response.body.data.length).not.toBe(0);
    });
});

describe('PATCH /api/update/lectivos/4', () => {
    it('Should update an existing lectivo', async () => {
      const response = await supertest(app)
        .patch('/api/update/lectivos/4')
        .send({ nom_año: '2025 - 2026' });

      expect(response.status).toBe(200);
    });
  });




