import prismaClient from "../../prisma";

class ListCategoriesService{
    async execute(){
        
        const categories = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true
            },
            orderBy: {
                created_at: "desc"
            }
        })

        return categories;
    }
}

export { ListCategoriesService }