import { products } from "../db/products.js";

export const getOneProduct = (req, reply) => {
    const { id } = req.params;
    const product = products.find( product => product.id == id);
    if(!product) reply.code(404).send({message: 'Product not found'})
    reply.send(product)
}

export const getProducts = (req, reply) => {
    reply.send({products, user: req.user})
}