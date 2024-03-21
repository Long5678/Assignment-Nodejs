import express from "express";
import siteController from "../app/controllers/SiteController.js";

const router = express.Router();

router.use('/Login', siteController.login);
router.use('/Signup', siteController.signup);
router.use('/search', siteController.search);
router.use('/', siteController.index);



export default router;
