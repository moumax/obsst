const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/", UserController.browse);
router.get("/:id", UserController.read);
router.post("/", UserController.add);
router.put("/:id", UserController.modify);
router.delete("/:id", UserController.delete);

module.exports = router;
