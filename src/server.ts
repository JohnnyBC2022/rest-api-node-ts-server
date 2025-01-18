import express from 'express'
import router from './router'
import db from './config/db'

// Conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log('Conexión con la base de datos realiza correctamente')
    } catch (error) {
        console.log(error)
        console.log('Hubo un error al conectar a la base de datos')
    }    
}

connectDB()

const server = express()

server.use("/api/v1/products", router)

export default server