import prisma from "../db";

// get all products for user
export async function getProducts(req, res) {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.json({
        data: user.products
    })
}

// get one product for user
export async function getOneProduct(req, res) {
    const id = req.params.id;
    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    })

    res.json({
        data: product
    })
}

// create a new product for user
export async function createProduct (req, res, next) {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        })
    
        res.json({
            data: product
        })
    } catch (err) {
        next(err);
    }
}

// update existing product
export async function updateProduct (req, res) {
    const updatedProduct = await prisma.product.update({
        where: {
            // id: req.params.id,
            // belongsToId: req.user.id
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    })

    res.json({
        data: updatedProduct
    })
}

// delete product
export async function deleteProduct (req, res) {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                // id: req.params.id,
                // belongsToId: req.user.id
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id
                }
            }
        })
    
        res.json({
            data: deletedProduct
        })
    } catch (error) {
        console.log(error);
        res.status(403);
        res.json({error: error})
    }
}