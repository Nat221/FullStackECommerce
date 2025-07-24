import "dotenv/config";
import express, { json, urlencoded } from "express";
import productsRoutes from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";
import ordersRoutes from "./routes/orders/index.js";
import stripeRoutes from "./routes/stripe/index.js";
import serverless from "serverless-http";

const port = 3000;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use((req, res, next) => {
  if (req.body && Buffer.isBuffer(req.body)) {
    try {
      req.body = JSON.parse(req.body.toString());
    } catch (error) {
      console.error("Error parsing buffer body: ", error);
    }
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/products", productsRoutes);
app.use("/auth", authRoutes);
app.use("/orders", ordersRoutes);
app.use("/stripe", stripeRoutes);

// if (process.env.NODE_ENV === "dev") {
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
// }

export const handler = serverless(app);
