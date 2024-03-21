import express from "express";
import UserController from "../app/controllers/UserController.js";

const router = express.Router();

router.use('/create', UserController.create);
router.use('/:id', UserController.show);
router.use('/', UserController.index);

export default router;
