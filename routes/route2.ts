import { Router } from "express";

const router = Router();

router.use("/", async (req, res) => {
  try {
    console.log("route deux!");
    res.json({"red": "black"})
  } catch (e) {
    const err = <Error>e;
    console.error(err.message);
    res.json("something went wrong...")
  }
});

export default router;