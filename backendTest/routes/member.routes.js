const router = require("express").Router();
const MemberController = require("../controllers/member.controller");

// Member routes
router.post("/", MemberController.createMember);
router.get("/", MemberController.getAllMembers);
router.get("/:memberID", MemberController.getMemberById);
router.put("/:memberID", MemberController.updateMember);
router.delete("/:memberID", MemberController.deleteMember);

module.exports = router;
