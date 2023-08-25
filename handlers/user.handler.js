import { User, UserDetail } from "../model/user.model.js";

export const getProfileHandler = async(req, reply) => {
    const user = await User.findOne({
        where: {
            id: req.user.id
        },
        include: [
            {
                model: UserDetail,
                foreignKey: 'UserId',
                as: 'UserDetail',
                attributes: ['id', 'address', 'latitude', 'longitude']
            }
        ]
    });
    return reply.code(201).send({
        statusCode: 200,
        user,
    })
}

export const updateProfileHandler = async(req, reply) => {
    const body = { ...req.body };
    const userDetail = await UserDetail.findOne({
        where: {
            UserId: Number(req.user.id),
        }
    });
    const updateData = {};
    Object.keys(body).forEach(key => {
        if(['', ' ', null, undefined, 0, '0', NaN].includes(body[key])) {
            delete body[key];
        }else {
            updateData[key] = body[key]
        }
    })
    if(userDetail) {
        await UserDetail.update(updateData, {
            where: {
              id: userDetail.id
            }
        });
    } else {
        updateData.UserId = req.user.id;
        const newUserDetail = await UserDetail.create(updateData);
    }
    reply.code(201).send({
        statusCode: 201,
        message: 'User profile detail updated successfully'
    })
}
