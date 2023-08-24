import { userRegisterHandler } from "../handlers/auth.handler.js";

const userRegister = {
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
                type: 'object'
            }
        }
    },
    handler: userRegisterHandler
}

export default function authRoutes(fastify, options, done) {
    fastify.post('/register', userRegister)
    done();
}