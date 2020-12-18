import { protect } from "../middleware/authMiddleware.js";
import Product from "../Modal/product.js";

// @desc    fetch all products
// @route   GET /api/products
// @access  public

const getProducts = async (req, res, next) => {
    try {
        const pageSize = 2;
        const page = Number(req.query.pageNumber) || 1; // on which page u are

        const keyword = req.query.keyword
            ? {
                  name: {
                      $regex: req.query.keyword,
                      $options: "i",
                  },
              }
            : {};

        const count = await Product.countDocuments({ ...keyword })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        const products = await Product.find({ ...keyword });

        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(404).json("Error");
        next(error);
    }
};

// @desc    fetch all products
// @route   GET /api/products
// @access  public

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "product not found" });
        }
    } catch (error) {
        res.status(404).json("Error");
        next(error);
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  private

const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.remove();
            res.json("Removed product");
        } else {
            res.status(404).json({ message: "product not found" });
        }
    } catch (error) {
        res.status(404).json("Error");
        next(error);
    }
};

// @desc    create a product
// @route   POST /api/products
// @access  private

const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create({
            name: "sample name",
            price: 0,
            user: req.user._id,
            image: "/images/sample.jpg",
            brand: "sample brand",
            category: "sample category",
            countInStock: 0,
            numReviews: 0,
            description: "sample discription",
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(404).json("Error");
        next(error);
    }
};

// @desc    create a product
// @route   DELETE /api/products
// @access  private

const updateProduct = async (req, res, next) => {
    try {
        const {
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            numReviews,
            description,
        } = req.body;

        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                $set: {
                    name: name,
                    price: price,
                    image: image,
                    brand: brand,
                    category: category,
                    countInStock: countInStock,
                    numReviews: numReviews,
                    description: description,
                },
            },
            { new: true }
        );

        res.status(201).json(product);
    } catch (error) {
        res.status(404).json("Error");
        next(error);
    }
};

// @desc    Create New review
// @route   POST /api/products/:id/review
// @access  private

const CreateProductReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );
            if (alreadyReviewed) {
                res.status(400).json("Product already reviewed");
                return;
            }
            let review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            let updatedProduct = await Product.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                {
                    $push: {
                        reviews: review,
                    },
                },
                { new: true }
            );

            let ratings =
                updatedProduct.reviews.reduce(
                    (acc, item) => item.rating + acc,
                    0
                ) / updatedProduct.reviews.length;

            if (isNaN(ratings)) {
                ratings = 0;
            }
            let numOFReview = updatedProduct.reviews.length;

            await Product.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                {
                    $set: {
                        rating: ratings,
                        numReviews: numOFReview,
                    },
                },
                { new: true }
            );

            res.status(201).json("review added");
            return;
        }
        res.status(404).json("Product not found");
    } catch (error) {
        res.status(404).json("Error");
        next(error);
    }
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public

const getTopProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(3);

        res.json(products);
    } catch (error) {
        res.status(404).json("Error");
        next(error);
    }
};

export {
    getProductById,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    CreateProductReview,
    getTopProducts,
};
