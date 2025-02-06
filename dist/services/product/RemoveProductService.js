"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveProductService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
class RemoveProductService {
    execute(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productHasOrder = yield prisma_1.default.item.findMany({
                where: {
                    product_id
                },
                include: {
                    order: true
                }
            });
            if (productHasOrder.length > 0) {
                const hasOpenOrders = productHasOrder.some(product => {
                    return product.order.status === false;
                });
                if (hasOpenOrders) {
                    throw new Error("Há pedidos em aberto com este produto. Conclua-os primeiro.");
                }
                else {
                    yield prisma_1.default.item.deleteMany({
                        where: {
                            product_id: product_id,
                        }
                    });
                }
            }
            const bannerCloudinary = yield prisma_1.default.product.findFirst({
                where: {
                    id: product_id,
                    banner: {
                        contains: "cloudinary"
                    }
                },
                select: {
                    banner_public_id: true
                }
            });
            if (bannerCloudinary === null || bannerCloudinary === void 0 ? void 0 : bannerCloudinary.banner_public_id) {
                try {
                    yield cloudinary_1.v2.uploader.destroy(bannerCloudinary.banner_public_id);
                }
                catch (err) {
                    console.log("Erro ao deletar imagem no Cloudinary ", err);
                }
            }
            const product = yield prisma_1.default.product.delete({
                where: {
                    id: product_id
                }
            });
            return product;
        });
    }
}
exports.RemoveProductService = RemoveProductService;
