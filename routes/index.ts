import route1 from "./route1";
import route2 from "./route2";
import { Router } from "express";
import { login, register } from "../controllers/index";
import Validators from "../util/validators";


const router = Router();

router.post("/login", Validators.login_validator, login);
router.post("/register", Validators.register_validator, register);

export {
  route1, route2
}

export default router;