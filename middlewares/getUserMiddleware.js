import { User } from "../model/user.model.js";
import { fastify } from "../server.js";

export const getUserMiddleware = async(req, reply) => {
    const authorization = req.headers?.authorization;
    if(!authorization) {
        return reply.code(401).send({
            statusCode: 401,
            message: 'Please login first1'
        });
    }
    const [bearer, token] = authorization.toString().split(" ");
    if(bearer && bearer.toLowerCase() == 'bearer') {
        const result = fastify.jwt.verify(token);
        if(typeof result == "string") {
            return reply.code(401).send({
                statusCode: 401,
                message: 'Please login first2'
            })
        }
        const { username } = result;
        const user = await User.findOne({
            where: {username}
        });
        if(!user) {
            return reply.code(401).send({
                statusCode: 401,
                message: 'Please login first3'
            });
        }
        req.user = user.dataValues;
        // next(); 
        //-> The done callback is not available when using async/await or returning a Promise.
        //  If you do invoke a done callback in this situation unexpected behavior may occur,
        //  e.g. duplicate invocation of handlers.
        return req
    } else {
        return reply.code(401).send({
            statusCode: 401,
            message: 'Please login first4'
        })
    }    
}