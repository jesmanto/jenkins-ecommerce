const request = require('supertest');
const app = require('../src/app');

describe('E-commerce API Tests', () => {
    test('GET /products should return all products', async () => {
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /products/:id should return a product if it exists', async () => {
        const response = await request(app).get('/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('name', 'Laptop');
    });

    test('GET /products/:id should return 404 if product does not exist', async () => {
        const response = await request(app).get('/products/999');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Product not found');
    });
});
