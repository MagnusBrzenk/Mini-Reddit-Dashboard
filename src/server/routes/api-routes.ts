import { NETWORK } from "__MODELS";
import express from "express";
const router = express.Router();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Route to 'authenticate' /api/* calls in a super-simple manner
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
router.get(`/api/xxx`, async (req: express.Request, res: express.Response) => {
    return res.send({});
});

export default router;
