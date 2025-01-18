import express from 'express'
import router from './router'

const server = express()

server.use("/api/v1/products", router)

export default server