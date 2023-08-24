export default function indexRoutes(fastify, options, done) {
    fastify.get('/', (req, reply) => {
        reply.send({ message: 'FASTIFY!'})
    })
    done();
}