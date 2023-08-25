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
    reply.code(200).send(newUser);
}

export const userLoginHandler = async(req, reply) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: { username },
    });
    if(!user) return reply.code(404).send({message: 'Username or password is wrong'});
    const compareResult = await fastify.bcrypt.compare(password, user.password);
    if(compareResult) {
        const accessToken = fastify.jwt.sign({username}, {expiresIn: '24h' });
        user.accessToken = accessToken;
        await user.save();
        return reply
            .code(200)
            .headers({
                'authorization': accessToken
            })
            .send({
                message: 'Login successfully'
            })
    }
    reply.code(401).send({
        message: 'Username or password is wrong'
    })
}