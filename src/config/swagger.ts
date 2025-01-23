import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [
            {
                name: 'Products',
                description: 'API operations realted to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express /TypeScript',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/router.ts']
}
const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link{
            content: url('https://johnnybc-portfolio.vercel.app/favicon.png');
            height: 80px;
            widht: auto;
        }
        .swagger-ui .topbar {
            background-color: #292d39;
        }
    `,
    customSiteTitle: 'Documentación REST API Express / TypeScript',
    customfavIcon:  'https://johnnybc-portfolio.vercel.app/favicon.png'
}
export default swaggerSpec
export {
    swaggerUiOptions
}