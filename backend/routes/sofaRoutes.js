const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const {
  createSofa,
  getSofas,
  getSofa,
  updateStatus,
  updateSofa,
  deleteSofa,
} = require("../controllers/sofaController")

router.get("/", protect, getSofas)
router.get("/:id", protect, getSofa)
router.post("/", protect, createSofa)
router.put("/:id", protect, updateStatus)
router.put("/:id/novo", protect, updateSofa)
router.delete("/", protect, deleteSofa)

module.exports = router
