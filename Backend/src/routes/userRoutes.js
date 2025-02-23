import { Router } from "express";
import { getRefferalCode, userLogin } from "../controllers/userController.js";
import { authenticateFirebaseUser } from "../middlewares/authMW.js";

const router = Router()

router.post('/auth' , authenticateFirebaseUser ,userLogin);
router.post('/referral-code' , getRefferalCode);

export default router;