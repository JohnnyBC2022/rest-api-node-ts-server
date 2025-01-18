import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()


/*
Otra opción de conexión:
const db = new Sequelize('process.env.DATABASE_URL',{
    dialectOptions: {
        ssl: {
            require: false
        }
    }
}) */

const db = new Sequelize(process.env.DATABASE_URL!) // El interrogante es para garantizar que esa variable existe

export default db