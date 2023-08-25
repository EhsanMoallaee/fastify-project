import Fastify from'fastify';
import cors from '@fastify/cors';
import fastifyBcrypt from 'fastify-bcrypt';
import fastifySwagger from '@fastify/swagger';
import fastifyJwt from '@fastify/jwt';
import fastifyMiddie from '@fastify/middie';
import fastifySwaggerUi from '@fastify/swagger-ui';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { fastifySwaggerConfig, fastifySwaggerUIConfig } from './config/swagger.config.js';
import authRoutes from './routes/auth.routes.js';
import indexRoutes from './routes/index.routes.js';
import productRoutes from './routes/product.routes.js';
import './config/fastifyenv.config.js';
import './config/sequelize.config.js';
import serveStatic from 'serve-static';

export const fastify = Fastify({logger: true});
const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

fastify.register(fastifyBcrypt, {
    saltWorkFactor: 12,
})
fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET
})
fastify.register(fastifySwagger, fastifySwaggerConfig);
fastify.register(fastifySwaggerUi, fastifySwaggerUIConfig);

fastify.register(indexRoutes);
fastify.register(authRoutes, { prefix: 'auth' });
fastify.register(productRoutes, { prefix: 'products' });

const main = async() => {
    await fastify.register(cors, {});
    await fastify.register(fastifyMiddie);
    fastify.use('/', serveStatic(path.join(__dirname, 'public')));
    fastify.listen({port: PORT}, err => {
        if(err) console.log(err);
        console.log(`Server is running on : ${PORT}`);
    })
}

main()