import Fastify from'fastify';
import productRoutes from './routes/product.routes.js';
import indexRoutes from './routes/index.routes.js';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { fastifySwaggerConfig, fastifySwaggerUIConfig } from './config/swagger.config.js';

const fastify = Fastify({logger: true});
const PORT = 5000;

fastify.register(fastifySwagger, fastifySwaggerConfig);
fastify.register(fastifySwaggerUi, fastifySwaggerUIConfig);

fastify.register(indexRoutes);
fastify.register(productRoutes, { prefix: 'products' });

const main = async() => {
    fastify.listen({port: PORT}, err => {
        if(err) console.log(err);
        console.log(`Server is running on : ${fastify.server.address().port}`);
    })
}

main()