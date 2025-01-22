import express from 'express'
import colors from 'colors' // esto sirve para mostrar los mensajes de la consola con distintos colores
import router from './router'
import db from './config/db'

// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.green.bold('Conexión con la base de datos realiza correctamente'))
    } catch (error) {
        console.log(colors.red.bold('Hubo un error al conectar a la base de datos'))
    }
}

connectDB()

// Instancia de express
const server = express()

// Leer datos de formularios
server.use(express.json())

server.use("/api/v1/products", router)

server.get('/api', (req,res) =>{
    res.json({msg: 'Desde API'})
})

export default server