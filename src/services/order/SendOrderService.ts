import prismaClient from "../../prisma";

class SendOrderService{
    async execute(order_id: string){
        const order = await prismaClient.order.update({
            data: {
                draft: false
            },
            where: {
                id: order_id
            }
        })
    
        return order;
    }
}

export { SendOrderService }