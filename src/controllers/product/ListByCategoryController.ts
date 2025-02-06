import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController{
    async handle(req: Request, res: Response){
        const { category_id } = req.query;
    
        const listByCategory = new ListByCategoryService()
        const productsByCategory = await listByCategory.execute(category_id as string);

        res.json(productsByCategory);
    }
}

export { ListByCategoryController }