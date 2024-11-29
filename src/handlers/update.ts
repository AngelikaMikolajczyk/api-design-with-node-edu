import prisma from '../db';

export async function getAllUpdates(req, res) {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])
   
    res.json({
        data: updates
    }) 
}

export async function getOneUpdate(req, res) {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({
        data: update
    })
}

export async function createUpdate(req, res) {
    const { productId, ...rest } = req.body;
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId,
            belongsToId: req.user.id
        }
    })
    if(!product) {
        // produkt nie należu do usera
        return res.json({message: 'not allowed'})
    }
    const newUpdate = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {
                connect: {id: product.id}
            }
        }
    })

    res.json({
        data: newUpdate
    })
}

export async function updateUpdate(req, res) {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find((update) => update.id === req.params.id);

    if(!match) {
        // handle 
        return res.json({message: 'nope'})
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({
        data: updatedUpdate
    })
}

export async function deleteUpdate(req, res) {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find((update) => update.id === req.params.id);

    if(!match) {
        // handle 
        return res.json({message: 'nope'})
    }

    const deletedUpdate = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({
        data: deletedUpdate
    })

}