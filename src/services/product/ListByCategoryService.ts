import prismaClient from "../../prisma"

class ListByCategoryService{
    async execute(category_id: string){

        const productsPerCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            },
            orderBy: {
                created_at: "desc"
            }
        })

        return productsPerCategory;

    }
}

export { ListByCategoryService }