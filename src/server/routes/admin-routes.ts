import { NETWORK } from "__MODELS";
import express from "express";
const router = express.Router();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Protected route to trigger uploading of pseudo data to mongoDB
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
router.get("/admin/xxx", async (req: express.Request, res: express.Response) => {
    return res.send(JSON.stringify({}, null, 2));
});

export default router;
