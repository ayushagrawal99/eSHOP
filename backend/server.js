import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import colors from "colors";
import morgan from "morgan";
dotenv.config();
import productRoutes from "./routes/product.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoute.js";
connectDB();
import { notFound, errorHandler } from "./middleware/errormiddleware.js";

const app = express();
app.use(express.json());

if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
}

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "/frontend/public")));

    app.get("*", (req, res) =>
        res.sendFile(
            path.resolve(__dirname, "frontend", "public", "index.html")
        )
    );
} else {
    app.get("/", (req, res) => {
        res.send("Api running....");
    });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running at Port ${PORT}`.yellow.bold));
