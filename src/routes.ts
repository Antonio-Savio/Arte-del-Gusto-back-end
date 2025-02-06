import { Router } from 'express'
import multer from 'multer';
import { CreateUserController } from './controllers/user/createUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoriesController } from './controllers/category/ListCategoriesControllers';
import { RemoveCategoryController } from './controllers/category/RemoveCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { RemoveProductController } from './controllers/product/RemoveProductController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { ConcludeOrderController } from './controllers/order/ConcludeOrderController';

import { checkAuth } from './middlewares/checkAuth';
import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("/"))

//--- rotas user ---
router.post("/users", new CreateUserController().handle)

router.post("/session", new AuthUserController().handle)

router.get("/userinfo", checkAuth, new DetailUserController().handle)

//--- rotas category ---
router.post("/category", checkAuth, new CreateCategoryController().handle)

router.get("/category", checkAuth, new ListCategoriesController().handle)

router.delete("/category", checkAuth, new RemoveCategoryController().handle)

//--- rotas product ---
//router.post("/product", checkAuth, upload.single('file), new CreateProductController().handle)
router.post("/product", checkAuth, new CreateProductController().handle)

router.get("/category/product", checkAuth, new ListByCategoryController().handle)

router.delete("/product", checkAuth, new RemoveProductController().handle)

//--- rotas pedido ---
router.post("/order", checkAuth, new CreateOrderController().handle)

router.delete("/order", checkAuth, new RemoveOrderController().handle)

router.post("/order/add", checkAuth, new AddItemController().handle)

router.delete("/order/remove", checkAuth, new RemoveItemController().handle)

router.put("/order/send", checkAuth, new SendOrderController().handle)

router.get("/orders", checkAuth, new ListOrdersController().handle)

router.get("/order/detail", checkAuth, new DetailOrderController().handle)

router.put("/order/conclude", checkAuth, new ConcludeOrderController().handle)

export { router }