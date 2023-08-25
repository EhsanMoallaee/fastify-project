import { fastify } from "../server.js";
import { User } from "../model/user.model.js";

export const userRegisterHandler = async(req, reply) => {
    const { username, password, first_name, last_name } = req.body;
    const newUser = new User({
        username,
        first_name,
        last_name,
        password: await fastify.bcrypt.hash(password),
    });
    await newUser.save();
    reply.status(200).send(newUser);
}

export const userLoginHandler = async(req, reply) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: { username },
    });
    if(!user) return reply.status(404).send({message: 'Username or password is wrong'});
    const compareResult = await fastify.bcrypt.compare(password, user.password);
    if(compareResult) {
        return reply.status(200).send({
            message: 'Login successfully'
        })
    }
    reply.status(401).send({
        message: 'Username or password is wrong'
    })
}