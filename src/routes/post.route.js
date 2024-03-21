import express from "express"; // step 1
import postController from "../app/controllers/PostController.js";  // step 3

const router = express.Router(); // step 2

router.use('/:id', postController.show); // localhost:3000/posts/101
router.use('/', postController.index); // localhost:3000/posts/

export default router;