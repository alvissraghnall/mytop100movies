import { Router } from "express";
import list__get from "../controllers/list-get";
import verifyToken from "../util/../util/token-auth";

const router = Router();

router.get("/list", verifyToken, list__get);

export default router;
