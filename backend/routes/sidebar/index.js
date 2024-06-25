const express = require("express");
const router = express.Router();
const SidebarController = require("../../controllers/sidebar.controller");

// Create a new Sidebar
router.post(
  "/createSidebar",
  SidebarController.updatePhoto,
  SidebarController.createSidebar
);
router.get("/getAllSidebar", SidebarController.getAllSidebar);

router.put("/updateSidebar/:id", SidebarController.updateSidebar);

module.exports = router;
