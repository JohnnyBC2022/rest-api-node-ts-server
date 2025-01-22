import request from 'supertest'
import server from '../../server'

jest.setTimeout(10000) // añadimos un tiempo para que pueda ejecutar la prueba

describe('/POST /api/v1/products', () => {
    it('should display validation errors', async()=>{
        const response = await request(server).post('/api/v1/products')
        .send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })


    it('should create a new product', async () => {
        const response = await request(server).post('/api/v1/products')
        .send({
            name: "Teléfono Móvil - Testing",
            price: 310.99
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toEqual(200) // son equivalentes, aunque toBe no usar para números decimales
        expect(response.body).not.toHaveProperty('error')
    }, 10000)
})