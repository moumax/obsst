const express = require("express");
const CamerasController = require("../controllers/CamerasController");

const router = express.Router();

router.get("/", CamerasController.browse);
router.get("/:id", CamerasController.read);
router.post("/", CamerasController.add);
router.put("/:id", CamerasController.modify);
router.delete("/:id", CamerasController.delete);

module.exports = router;
