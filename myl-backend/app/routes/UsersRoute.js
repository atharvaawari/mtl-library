const router = require("express").Router();

// const {}


router.route("./getUsers").get(getUsers)
router.route("./formSubmit").post(formSubmit)
router.route("./updateEmployee").post(updateEmployee)
router.route("./deleteEmployee/:id").get(deleteEmployee);

module.exports = router;