import express from "express";
const router = express.Router();
import {
    getProductById,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    CreateProductReview,
    getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.get("/", getProducts);
router.get("/top", getTopProducts);
router.post("/", protect, admin, createProduct);
router.get("/:id", getProductById);
router.post("/:id/review", protect, CreateProductReview);
router.delete("/:id", protect, admin, deleteProduct);
router.put("/:id", protect, admin, updateProduct);

export default router;
