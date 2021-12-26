var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("routes/route1", ["require", "exports", "express"], function (require, exports, express_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const router = (0, express_1.Router)();
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("route 1");
            res.status(200).json({ "msg": "route 1" });
        }
        catch (e) {
            const err = e;
            console.error(err.message);
            res.status(404).send("...something went wrong...");
        }
    }));
    exports.default = router;
});
define("routes/route2", ["require", "exports", "express"], function (require, exports, express_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const router = (0, express_2.Router)();
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("route deux!");
            res.json({ "red": "black" });
        }
        catch (e) {
            const err = e;
            console.error(err.message);
            res.json("something went wrong...");
        }
    }));
    exports.default = router;
});
define("routes/index", ["require", "exports", "routes/route1", "routes/route2"], function (require, exports, route1_1, route2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    route1_1 = __importDefault(route1_1);
    route2_1 = __importDefault(route2_1);
    let routes = {
        route1: route1_1.default,
        route2: route2_1.default
    };
    exports.default = routes;
});
define("main", ["require", "exports", "express", "routes/index"], function (require, exports, express_3, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1 = __importDefault(index_1);
    const router = (0, express_3.Router)();
    router.get("ram", (req, res) => {
        res.send("hahahah");
    });
    router.get("1", index_1.default.route1);
    router.use("2", index_1.default.route2);
    exports.default = router;
});
define("index", ["require", "exports", "express", "main"], function (require, exports, express_4, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    express_4 = __importDefault(express_4);
    main_1 = __importDefault(main_1);
    const app = (0, express_4.default)();
    const PORT = process.env.PORT || 8888;
    app.use(express_4.default.json());
    app.use("/", main_1.default);
    app.use("/axe", (req, res) => {
        res.json({ "test": "passed!" });
    });
    //app.get("/", main);
    app.listen(PORT, () => {
        console.log(`app running on port ${PORT}`);
    });
});
