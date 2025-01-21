import { Sequelize } from "sequelize-typescript";
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

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*.ts'],
    logging: false
}) // El signo de exclamación es para garantizar que esa variable existe

export default db