
import { Router } from "express";
import { login, register } from "../controllers/index";
import list from "./list";
import Validators from "../util/validators";


const router = Router();

router.post("/login", Validators.login_validator, login);
router.post("/register", Validators.register_validator, register);
router.use(list);


export default router;