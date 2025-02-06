"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const createUserController_1 = require("./controllers/user/createUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoriesControllers_1 = require("./controllers/category/ListCategoriesControllers");
const RemoveCategoryController_1 = require("./controllers/category/RemoveCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
const RemoveProductController_1 = require("./controllers/product/RemoveProductController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrdersController_1 = require("./controllers/order/ListOrdersController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const ConcludeOrderController_1 = require("./controllers/order/ConcludeOrderController");
const checkAuth_1 = require("./middlewares/checkAuth");
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
//--- rotas user ---
router.post("/users", new createUserController_1.CreateUserController().handle);
router.post("/session", new AuthUserController_1.AuthUserController().handle);
router.get("/userinfo", checkAuth_1.checkAuth, new DetailUserController_1.DetailUserController().handle);
//--- rotas category ---
router.post("/category", checkAuth_1.checkAuth, new CreateCategoryController_1.CreateCategoryController().handle);
router.get("/category", checkAuth_1.checkAuth, new ListCategoriesControllers_1.ListCategoriesController().handle);
router.delete("/category", checkAuth_1.checkAuth, new RemoveCategoryController_1.RemoveCategoryController().handle);
//--- rotas product ---
//router.post("/product", checkAuth, upload.single('file), new CreateProductController().handle)
router.post("/product", checkAuth_1.checkAuth, new CreateProductController_1.CreateProductController().handle);
router.get("/category/product", checkAuth_1.checkAuth, new ListByCategoryController_1.ListByCategoryController().handle);
router.delete("/product", checkAuth_1.checkAuth, new RemoveProductController_1.RemoveProductController().handle);
//--- rotas pedido ---
router.post("/order", checkAuth_1.checkAuth, new CreateOrderController_1.CreateOrderController().handle);
router.delete("/order", checkAuth_1.checkAuth, new RemoveOrderController_1.RemoveOrderController().handle);
router.post("/order/add", checkAuth_1.checkAuth, new AddItemController_1.AddItemController().handle);
router.delete("/order/remove", checkAuth_1.checkAuth, new RemoveItemController_1.RemoveItemController().handle);
router.put("/order/send", checkAuth_1.checkAuth, new SendOrderController_1.SendOrderController().handle);
router.get("/orders", checkAuth_1.checkAuth, new ListOrdersController_1.ListOrdersController().handle);
router.get("/order/detail", checkAuth_1.checkAuth, new DetailOrderController_1.DetailOrderController().handle);
router.put("/order/conclude", checkAuth_1.checkAuth, new ConcludeOrderController_1.ConcludeOrderController().handle);
