const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const contactController = require("../../controllers/contact.controller");
const authsController = require("../../controllers/auths.controller");

router.post(
  "/SingUp",
  contactController.createContact,
  userController.singUpUser,
  userController.userSendEmail
);
router.post(
  "/addContact",
  authsController.protect,
  contactController.createContact,
  userController.addContact
);
router.post(
  "/defaultContact/:_id",
  authsController.protect,
  userController.defaultContact
);
router.delete(
  "/delContact/:contactId",
  authsController.protect,
  contactController.delContact,
  userController.delContact
);
router.patch(
  "/UpdateContact/:contactId",
  authsController.protect,
  contactController.updateContact,
  userController.updateContact
);

module.exports = router;
