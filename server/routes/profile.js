const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {sitterList, createProfile,updateProfile,deleteProfile,becomeSitter,getProfileById} = require("../controllers/profile");

router.route("/sitterList").get(sitterList);
router.route("/").post(protect, createProfile)
router.route("/:id").put(protect, updateProfile)
router.route("/:id").put(protect, getProfileById)
router.route("/:id").delete(protect, deleteProfile)
router.route("/:id/sitter").post(protect,becomeSitter)

module.exports = router;
