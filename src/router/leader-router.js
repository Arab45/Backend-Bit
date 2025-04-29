const router = require("express").Router();
const upload = require("../utils/cloudFile");
const { createLeader, fetchAllLeaders, deleteLeader, updateLeader} = require("../controller/leader-controller");


router.post("/create-leader",  upload.fields([
    {name: "avatarImg", maxCount: 1},
]), createLeader);
router.get("/all-leaders", fetchAllLeaders);
router.delete("/delete-leader/:id", deleteLeader);
router.put("/update-leader/:id", upload.fields([
    {name: "avatarImg", maxCount: 1},
]), updateLeader);


module.exports = router;