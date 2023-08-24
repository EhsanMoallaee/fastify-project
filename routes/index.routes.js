const homePageSchema = {
    schema: {
        tags: ['Home-Page'],
        security: [{apiKey: []}],
        response: {
            200: { message: { type: 'string'}}
        }
    },
    handler: (req, reply) => {
        reply.send({ message: 'FASTIFY!'})
    }
}

export default function indexRoutes(fastify, options, done) {
    fastify.get('/', homePageSchema);
    done();
}