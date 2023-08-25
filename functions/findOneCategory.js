import { Category } from "../model/category.model.js"

export async function findOneCategory(id, title) {
    const findQuery = id ? {where: {id}} : {where: {title}}
    const category = await Category.findOne(findQuery);
    return category;
}