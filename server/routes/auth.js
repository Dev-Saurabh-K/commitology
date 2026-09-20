import { Router } from "express";
import { register, login, github, github_callback } from '../controllers/authController.js';

const router = Router();

router.get('/', (req, res)=>{
    res.send("auth route working")
});

router.post('/register', register);
router.post('/login', login);
router.get('/github', github);
router.get('/github/callback', github_callback)

export default router;