import express from "express";
import { metrics } from "./metrics.js";
const app = express();
app.get("/risk", (_, r) => r.json(metrics()));
app.listen(3000, () => console.log("Risk dashboard running on http://localhost:3000/risk"));
//# sourceMappingURL=server.js.map