import Fastify from'fastify';
import productRoutes from './routes/product.routes.js';
import indexRoutes from './routes/index.routes.js';
const fastify = Fastify({logger: true})

const PORT = 5000;
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