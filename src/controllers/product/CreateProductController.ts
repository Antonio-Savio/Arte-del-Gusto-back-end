import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { UploadedFile } from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});

class CreateProductController{
    async handle(req: Request, res: Response){
        const { name, price, description, category_id } = req.body

        const createProductService = new CreateProductService()

        if(!req.files || Object.keys(req.files).length === 0){
            throw new Error("Erro ao carregar arquivo")
        } 
        // const {originalname, filename: banner} = req.file //usando multer

        const fileReq = req.files as any;
        const file = fileReq['file'] as UploadedFile

        const uploadResult = await cloudinary.uploader
        .upload(`data:${file.mimetype};base64,${file.data.toString('base64')}`, {
            resource_type: "auto"
        })
        .catch((error) => {
            console.log(error);
            throw new Error("Erro ao processar o arquivo.")
        });
    

        const product = await createProductService.execute({
            name,
            price,
            description,
            banner: uploadResult.secure_url,
            category_id,
            banner_public_id: uploadResult.public_id
        })

        res.json(product)
    }
}

export { CreateProductController }