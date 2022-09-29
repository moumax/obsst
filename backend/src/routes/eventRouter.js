const express = require("express");
const EventsController = require("../controllers/UserController");

const router = express.Router();

router.get("/", EventsController.browse);
router.get("/:id", EventsController.read);
router.post("/", EventsController.add);
router.put("/:id", EventsController.modify);
router.delete("/:id", EventsController.delete);

module.exports = router;
