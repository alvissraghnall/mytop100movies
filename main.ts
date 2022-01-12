import { Router } from "express";
import routes from "./routes/index";

const router = Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now() / 1000);
  next();
});

router.use(routes);

router.get('/', function(req, res) {
  res.send('home page');
});

router.get('/about', function(req, res) {
  res.send('About us');
});

router.get("/ram", (req, res) => {
  res.send("hahahah");
})

export default router;