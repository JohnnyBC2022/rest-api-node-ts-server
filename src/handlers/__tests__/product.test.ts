import request from 'supertest'
import server from '../../server'

jest.setTimeout(10000) // añadimos un tiempo para que pueda ejecutar la prueba

describe('/POST /api/v1/products', () => {
    it('should create a new product', async () => {
        const response = await request(server).post('/api/v1/products')
        .send({
            name: "Teléfono Móvil - Testing",
            price: 310.99
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
    }, 10000)
})