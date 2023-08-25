import { getOneProduct, getProducts } from "../handlers/product.handler.js"
import {getUserMiddleware} from "../middlewares/getUserMiddleware.js"

const productSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
    }
}

const getOneProductSchema = {
    schema: {
        tags: ['Products'],
        summary: 'Get one product by id',
        security: [{
            apiKey: []
        }],
        params: {
            id: { type: "integer", description: 'Product id' },
        },
        response: {
            200: productSchema
        }
    },
    preHandler: [getUserMiddleware],
    handler: getOneProduct
}

const getProductsSchema = {
    schema: {
        tags: ['Products'],
        summary: 'Get all products',
        security: [{
            apiKey: []
        }],
        response: {
            200: {
                type: 'object',
                properties: {
                    products: {
                        type: 'array',
                        items: productSchema
                    },
                    user: {
                        type: 'object',
                        properties: {
                            id: { type: "number" },
                            username: { type: "string" },
                            first_name: { type: "string" },
                            last_name: { type: "string" },
                        }
                    }
                }
            }
        }
    },
    preHandler: [getUserMiddleware],
    handler: getProducts
}

export default function productRoutes(fastify, options, done) {
    fastify.get('/', getProductsSchema);
    fastify.get('/:id', getOneProductSchema);
    done()
}