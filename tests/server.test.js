const request = require('supertest');
const { app, server } = require('../index');

describe('Server', () => {
    afterAll((done) => {
        server.close(done);
    });

    it('should return a message indicating the server is running', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Server is running');
    });

    it('should create a new todo', async () => {
        const res = await request(app)
            .post('/todos')
            .send({ description: 'Test todo' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('description', 'Test todo');
    });
});
