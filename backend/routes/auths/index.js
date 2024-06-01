const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/auths.controller");

router.post("/login", AuthController.login);
router.post("/verifySingUp/:email", AuthController.verifySingUpToken);
router.post("/changePassword/:email", AuthController.changePassword);
router.post("/verifyToken/:email", AuthController.verifyToken);
router.post("/forgetPassword/:email", AuthController.forgetPassword);
router.post("/resetPassword/:email", AuthController.resetPassword);
router.post("/logout", AuthController.logout);
router.get("/getUser", AuthController.getUser);


module.exports = router;
