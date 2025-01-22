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

    it('should validate that the price is greater than 0', async()=>{
        const response = await request(server).post('/api/v1/products')
        .send({
            name: 'Monitor',
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should validate that the price is a number and greater than 0', async()=>{
        const response = await request(server).post('/api/v1/products')
        .send({
            name: 'Monitor',
            price: "Hola"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
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

describe('GET /api/v1/products', () =>{
    it('should check if api/v1/products url exists', async ()=>{
        const response = await request(server).get('/api/v1/products')

        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with products', async ()=>{
        const response = await request(server).get('/api/v1/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        // expect(response.body.data).toHaveLength(1)
        
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/v1/products/:id', ()=>{
    it('Should return a 404 response for a non-existent product', async()=>{
        const productId = 2000
        const response = await request(server).get(`/api/v1/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should check a valid ID in the url', async () =>{
        const response = await request(server).get('/api/v1/products/not-valid-url')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        // expect(response.body.errrors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('get a JSON response for a single product', async () =>{
        const response = await request(server).get('/api/v1/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})