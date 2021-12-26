import { Router } from "express";
import { route1, route2, register } from "./routes/index";
//import routeUn from "./routes/route1";

const router = Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now() / 1000);
  next();
});

router.get('/', function(req, res) {
  res.send('home page');
});

router.get('/about', function(req, res) {
  res.send('About us');
});

router.get("/ram", (req, res) => {
  res.send("hahahah");
})
router.use("/1", route1);
router.get("/2", route2);


router.post("/register", async (req, res) => register(req, res));

export default router;