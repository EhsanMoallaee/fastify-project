import { findOneCategory } from "../functions/findOneCategory.js";
import { Category } from "../model/category.model.js";

export const createCategoryHandler = async(req, reply) => {
    const { title } = req.body;
    const category = await findOneCategory(undefined, title);
    if(category) { 
        return reply.code(409).send({
            statusCode: 409,
            message: 'This category is already exist'
        })
    }
    const newCategory = await Category.create({title});
    if(!newCategory) {
        return reply.code(500).send({
            statusCode: 500,
            message: 'Internal server error occured'
        })
    }
    reply.code(201).send({
        statusCode: 201,
        message: 'Category created successfully'
    })
}

export const getOneCategoryHandler = async(req, reply) => {
    const { id } = req.params;
    const category = await findOneCategory(id);
    if(!category) {
        return reply.code(404).send({
            statusCode: 404,
            message: 'Category not found'
        })
    }
    reply.code(200).send({
        statusCode: 200,
        category
    })
}

export const getAllCategoryHandler = async(req, reply) => {
    const categories = await Category.findAll();
    if(!categories || categories.length == 0) {
        return reply.code(404).send({
            statusCode: 404,
            message: 'Category not found'
        })
    }
    reply.code(200).send({
        statusCode: 200,
        categories
    })
}

export const updateCategoryHandler = async(req, reply) => {
    const { id } = req.params;
    const { title } = req.body;
    const category = await findOneCategory(undefined, title);
    if(category) { 
        return reply.code(409).send({
            statusCode: 409,
            message: 'Category with this title is already exist'
        })
    }
    const updatedCategory = await Category.update({title}, {where : {id}});
    if(!updatedCategory) {
        return reply.code(500).send({
            statusCode: 500,
            message: 'Internal server error occured'
        })
    }
    reply.code(200).send({
        statusCode: 200,
        message: 'Category updated successfully'
    })
}

export const removeCategoryHandler = async(req, reply) => {
    const { id } = req.params;
    const category = await findOneCategory(id);
    if(!category) { 
        return reply.code(404).send({
            statusCode: 404,
            message: 'Category not found'
        })
    }
    await category.destroy();
    reply.code(200).send({
        statusCode: 200,
        message: 'Category deleted successfully'
    })
}