import prismaClient from "../../prisma";

interface ProductRequest{
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
    banner_public_id?: string;
}

class CreateProductService{
    async execute({name, price, description, banner, category_id, banner_public_id}: ProductRequest){

        const product = await prismaClient.product.create({
            data: {
                name,
                price,
                description,
                banner,
                category_id,
                banner_public_id
            }
        })

        return product;

    }
}

export { CreateProductService }