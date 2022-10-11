const express = require("express");
const OpticsController = require("../controllers/OpticsController");

const router = express.Router();

router.get("/", OpticsController.browse);
router.get("/:id", OpticsController.read);
router.post("/", OpticsController.add);
router.put("/:id", OpticsController.modify);
router.delete("/:id", OpticsController.delete);

module.exports = router;
