import { getOneProduct, getProducts } from "../handlers/product.handler.js"

const productSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
    }
}

const getOneProductSchema = {
    schema: {
        response: {
            200: productSchema
        }
    },
    handler: getOneProduct
}

const getProductsSchema = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: productSchema
            }
        }
    },
    handler: getProducts
}

export default function productRoutes(fastify, options, done) {
    fastify.get('/', getProductsSchema);
    fastify.get('/:id', getOneProductSchema);
    done()
}