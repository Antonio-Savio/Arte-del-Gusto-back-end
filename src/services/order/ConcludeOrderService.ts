import prismaClient from "../../prisma";

class ConcludeOrderService{
    async execute(order_id: string){
        const order = await prismaClient.order.update({
            data: {
                status: true,
            },
            where: {
                id: order_id
            }
        })

        return order;
    }
}

export { ConcludeOrderService }