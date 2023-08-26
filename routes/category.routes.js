import { 
    createCategoryHandler,
    getAllCategoryHandler,
    getOneCategoryHandler,
    removeCategoryHandler,
    updateCategoryHandler
} from "../handlers/category.handler.js";
import { getUserMiddleware } from "../middlewares/getUserMiddleware.js";

const categorySchema = {
    type: 'object',
    properties: {
        id: {type: 'number'},
        title: {type: 'string'}
    }
}

const addCategorySchema = {
    schema: {
        tags: ['Categories'],
        summary: 'Add category',
        security: [
            { apiKey: []}
        ],
        body: {
            type: 'object',
            required: ['title'],
            properties: {
                title: {type: 'string'},
                ParentId: {type: 'integer'}
            },
        },
        response: {
            201: {
                statusCode: {type: 'number'},
                message: {type: 'string'}
            }
        },
    },
    preHandler: [getUserMiddleware],
    handler: createCategoryHandler
}

const getOneCategorySchema = {
    schema: {
        tags: ['Categories'],
        summary: 'Get one category',
        security: [
            { apiKey: []}
        ],
        params: {
            type: 'object',
            required: ['id'],
            properties: {                
                id: {type: 'integer'}
            }
        },
        response: {
            201: {
                statusCode: {type: 'number'},
                category: categorySchema
            }
        },
    },
    preHandler: [getUserMiddleware],
    handler: getOneCategoryHandler
}

const getAllCategoriesSchema = {
    schema: {
        tags: ['Categories'],
        summary: 'Get all categories',
        security: [
            { apiKey: []}
        ],
        response: {
            201: {
                type: 'object',
                properties: {
                    statusCode: {type: 'number'},
                    categories: {
                        type: 'array',
                        items: categorySchema
                    }
                }
            }
        },
    },
    preHandler: [getUserMiddleware],
    handler: getAllCategoryHandler
}

const updateOneCategorySchema = {
    schema: {
        tags: ['Categories'],
        summary: 'Update one category',
        security: [
            { apiKey: []}
        ],
        params: {
            type: 'object',
            required: ['id'],
            properties: {                
                id: {type: 'integer'}
            }
        },
        body: {
            type: 'object',
            required: ['title'],
            properties: {
                title: {type: 'string'}
            },
        },
        response: {
            201: {
                statusCode: {type: 'number'},
                category: categorySchema
            }
        },
    },
    preHandler: [getUserMiddleware],
    handler: updateCategoryHandler
}

const removeOneCategorySchema = {
    schema: {
        tags: ['Categories'],
        summary: 'Remove one category',
        security: [
            { apiKey: []}
        ],
        params: {
            type: 'object',
            required: ['id'],
            properties: {                
                id: {type: 'integer'}
            }
        },
        response: {
            201: {
                statusCode: {type: 'number'},
                category: categorySchema
            }
        },
    },
    preHandler: [getUserMiddleware],
    handler: removeCategoryHandler
}

export default function categoryRoutes(fastify, options, done) {
    fastify.get('/:id', getOneCategorySchema);
    fastify.get('/list', getAllCategoriesSchema);
    fastify.post('/add', addCategorySchema);
    fastify.patch('/update/:id', updateOneCategorySchema);
    fastify.delete('delete/:id', removeOneCategorySchema);
    done();
}