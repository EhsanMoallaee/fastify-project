
const myMiddleware = (req, reply, next) => {
    console.log('This comes from firstMiddleware');
    next();
}

const homePageSchema = {
    schema: {
        tags: ['Home-Page'],
        response: {
            200: { 
                message: { type: 'string'}
            }
        }
    },
    preHandler: [myMiddleware],
    handler: async (req, reply) => {
        reply.send({
            message: 'FASTIFY Home Page'
        })
    }
}

export default function indexRoutes(fastify, options, done) {
    fastify.get('/', homePageSchema);
    done();
}