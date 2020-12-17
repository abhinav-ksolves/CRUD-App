const userController = require('../controllers/userController');
const router = require("express").Router();

router.post("/addUser",userController.create);

router.get("/",userController.findAll);

router.get("/:id",userController.findOne);

//updateUser
router.get("/updateUser/:id",userController.findOne);
router.post("/updateUser/:id",userController.update);

router.post("/delete/:id",userController.delete);


router.post("/deleteAll",userController.deleteAll);



module.exports = router;