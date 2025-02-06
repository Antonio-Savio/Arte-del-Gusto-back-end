import prismaClient from "../../prisma";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});


class RemoveProductService{
    async execute(product_id: string){
        const productHasOrder = await prismaClient.item.findMany({
            where: {
                product_id
            },
            include: {
                order: true
            }
        })

        if(productHasOrder.length > 0){
            const hasOpenOrders = productHasOrder.some( product => {
                return product.order.status === false;
            })

            if(hasOpenOrders){
                throw new Error("Há pedidos em aberto com este produto. Conclua-os primeiro.");
            } else{
                await prismaClient.item.deleteMany({
                    where: {
                        product_id: product_id,
                    }
                })
            }
        }

        const bannerCloudinary = await prismaClient.product.findFirst({
            where: {
                id: product_id,
                banner: {
                    contains: "cloudinary"
                }
            },
            select: {
                banner_public_id: true
            }
        })

        if(bannerCloudinary?.banner_public_id){
            try{
                await cloudinary.uploader.destroy(bannerCloudinary.banner_public_id);
            } catch(err){
                console.log("Erro ao deletar imagem no Cloudinary ", err)
            }
        }

        
        const product = await prismaClient.product.delete({
            where: {
                id: product_id
            }
        })

        return product;
    }
}

export { RemoveProductService }