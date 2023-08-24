import { User } from "../model/user.model.js";

export const userRegisterHandler = async(req, reply) => {
    const { username, password, first_name, last_name } = req.body;
    const newUser = new User({
        username,
        first_name,
        last_name,
        password,
    });
    await newUser.save();
    reply.send(newUser)
}