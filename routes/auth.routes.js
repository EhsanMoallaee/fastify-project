import { userLoginHandler, userRegisterHandler } from "../handlers/auth.handler.js";

const userRegisterSchema = {
    schema: {
        tags: ['Authentication'],
        summary: 'Register user',
        body: {
            type: "object",
            properties: {
                username: { type: "string" },
                first_name: { type: "string" },
                last_name: { type: "string" },
                password: { type: "string" }
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: "string" }
                }
            }
        }
    },
    handler: userRegisterHandler
}
const userLoginSchema = {
    schema: {
        tags: ['Authentication'],
        summary: 'Login user',
        body: {
            type: "object",
            properties: {
                username: { type: "string" },
                password: { type: "string" }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: "string" }
                }
            }
        }
    },
    handler: userLoginHandler
}

export default function authRoutes(fastify, options, done) {
    fastify.post('/register', userRegisterSchema);
    fastify.post('/login', userLoginSchema);
    done();
}