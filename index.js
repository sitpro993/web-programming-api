import express from "express";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import adminRouter from "./routers/adminRouter.js";
import collectionRouter from "./routers/collectionRouter.js";
import connectDB from "./database/connectDB.js";
import cors from "cors";

//config express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extension: true }));

//connect database
connectDB();

//enable CORS
app.use(cors());

//port
const port = process.env.PORT || 5000;

//router users
app.use("/api/users", userRouter);

//router products
app.use("/api/products", productRouter);

//router orders
app.use("/api/orders", orderRouter);

//router admin
app.use("/api/admin", adminRouter);

//router collections
app.use("/api/collections", collectionRouter);

app.get("/", (req, res) => {
  res.send("This is server");
});

app.use((err, req, res, next) => {
  res.status(500).send({ messsage: err.message });
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
