import Fastify from'fastify';
import productRoutes from './routes/product.routes.js';
import indexRoutes from './routes/index.routes.js';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const fastify = Fastify({logger: true});
const PORT = 5000;

fastify.register(fastifySwagger);
fastify.register(fastifySwaggerUi, {
    prefix: 'swagger',
    swagger: {
        info: {
            title: 'Fastify Swagger'
        },
        tags: [
            { name: 'Products', description: 'Product routes'}
        ]
    }
});
fastify.register(indexRoutes);
fastify.register(productRoutes, { prefix: 'products' });

const main = async() => {
    try {
        await fastify.listen({port: PORT})
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

main()