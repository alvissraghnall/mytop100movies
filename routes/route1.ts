import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  try {
    console.log("route 1");
    res.status(200).json({"msg": "route 1"})
  } catch (e) {
    const err = <Error>e;
    console.error(err.message);
    res.status(404).send("...something went wrong...");
  }
});


export default router;