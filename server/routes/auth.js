import { Router } from "express";
import { register, login } from '../controllers/authController.js';

const router = Router();

router.get('/', (req, res)=>{
    res.send("auth route working")
});

router.post('/register', register);
router.post('/login', login);

export default router;