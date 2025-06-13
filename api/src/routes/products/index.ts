import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("the list of products");
});

router.get("/:id", (req, res) => {
  console.log(req);
  res.send("Product");
});
router.post("/", (req, res) => {
  res.send("new product created");
});

export default router;
