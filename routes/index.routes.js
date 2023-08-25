const homePageSchema = {
    schema: {
        tags: ['Home-Page'],
        response: {
            200: { 
                message: { type: 'string'}
            }
        }
    },
    handler: async (req, reply) => {
        reply.send({
            message: 'FASTIFY Home Page'
        })
    }
}
const firstMiddleware = (req, reply, next) => {
    console.log('This comes from firstMiddleware');
    next();
}
const secondMiddleware = (req, reply, next) => {
    console.log('This comes from secondMiddleware');
    next();
}
export default function indexRoutes(fastify, options, done) {
    fastify.get('/', {preHandler: [firstMiddleware, secondMiddleware]}, async (req, reply) => {
        reply.send({
            message: "Middlewares Used",
        })
    })
    fastify.get('/homePage', homePageSchema);
    done();
}