export const fastifySwaggerConfig = {
    swagger: {
        info: {
            title: 'Fastify Swagger',
            description: 'Swagger document for fastify project',
            version: '0.1.0'
        },
        tags: [
            { name: 'Products', description: 'Product routes' }
        ],
        host: '127.0.0.1:5000',
        schemes: ['http'],
        consumes: ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'],
        securityDefinitions: {
            apiKey: {
                type: 'apiKey',
                in: 'header',
                name: 'authorization'
            }
        }
    }
}

export const fastifySwaggerUIConfig = {
    prefix: 'swagger',
    exposeRoute: true
}