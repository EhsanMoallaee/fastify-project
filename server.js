import Fastify from'fastify';
import cors from '@fastify/cors';
import fastifyBcrypt from 'fastify-bcrypt';
import fastifySwagger from '@fastify/swagger';
import fastifyJwt from '@fastify/jwt';
import fastifyMiddie from '@fastify/middie';
import fastifySwaggerUi from '@fastify/swagger-ui';
import serveStatic from 'serve-static';
import * as path from 'path';
import { fileURLToPath } from 'url';

import './config/fastifyenv.config.js';
import './config/sequelize.config.js';
import { fastifySwaggerConfig, fastifySwaggerUIConfig } from './config/swagger.config.js';
import authRoutes from './routes/auth.routes.js';
import indexRoutes from './routes/index.routes.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';

export const fastify = Fastify({logger: false});
const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const main = async() => {
    await fastify.register(fastifyMiddie);
    fastify.register(fastifyBcrypt, {
        saltWorkFactor: 12,
    })
    fastify.register(fastifyJwt, {
        secret: process.env.JWT_SECRET
    })
    fastify.register(fastifySwagger, fastifySwaggerConfig);
    fastify.register(fastifySwaggerUi, fastifySwaggerUIConfig);
    await fastify.register(cors, {});

    fastify.use('/', serveStatic(path.join(__dirname, 'public')));
    fastify.register(indexRoutes);
    fastify.register(authRoutes, { prefix: 'auth' });
    fastify.register(userRoutes, { prefix: 'user' });
    fastify.register(productRoutes, { prefix: 'products' });
    // fastify.use((err, req, res, next) => {
    //     console.log('Error : ', err.message);
    //     res.send(err)
    // })
    fastify.listen({port: PORT}, err => {
        if(err) console.log(err);
        console.log(`Server is running on : ${PORT}`);
    })
}

main()