import { getProfileHandler, updateProfileHandler } from "../handlers/user.handler.js"
import {getUserMiddleware} from "../middlewares/getUserMiddleware.js"

const getUserProfileSchema = {
    schema: {
        tags: ['Users'],
        summary: 'Get user profile',
        security: [{
            apiKey: []
        }],
        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: { type: 'number'},
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
    handler: getProfileHandler,
    preHandler: [getUserMiddleware]
}

const updateUserProfileSchema = {
    schema: {
        tags: ['Users'],
        summary: 'Update profile',
        security: [{
            apiKey: []
        }],
        body: {
            type: "object",
            properties: {
                address: { type: "string" },
                latitude: { type: "string" },
                longitude: { type: "string" }
            }
        },
        response: {
            201: {
                statusCode: { type: 'number'},
                message: { type: 'string'}
            }
        }
    },
    handler: updateProfileHandler,
    preHandler: [getUserMiddleware]
}

export default function userRoutes(fastify, options, done) {
    fastify.get('/', getUserProfileSchema);
    fastify.patch('/', updateUserProfileSchema);
    done()
}