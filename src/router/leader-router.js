const router = require("express").Router();
const { createLeader, fetchAllLeaders, deleteLeader, updateLeader} = require("../controller/leader-controller");

router.post("/create-leader", createLeader);
router.get("/all-leaders", fetchAllLeaders);
router.delete("/delete-leader/:id", deleteLeader);
router.put("/update-leader/:id", updateLeader);


module.exports = router;