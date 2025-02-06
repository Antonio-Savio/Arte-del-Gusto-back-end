import prismaClient from "../../prisma";

class RemoveCategoryService{
    async execute(category_id: string){
        const categoryInProduct = await prismaClient.product.findFirst({
            where: {
                category_id: category_id,
            }
        })

        if(categoryInProduct){
            throw new Error("Não é possível deletar categoria que tenha algum produto cadastrado.")
        }

        const category = await prismaClient.category.delete({
            where: {
                id: category_id
            }
        })

        return category;
    }
}

export { RemoveCategoryService }