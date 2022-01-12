import { Router } from "express";
import list__get from "../controllers/list-get";
import getList from "./list-get";
import postList from "./list-post";
import updateList from "./list-put";
import deleteList from "./list-del";

const router = Router();

router.get("/list", list__get);

export default router;