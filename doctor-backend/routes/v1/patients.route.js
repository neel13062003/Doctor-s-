const express = require("express");
const PatientsController = require("../../controllers/patients");

const router = express.Router();

router.get("/", PatientsController.getAllPatients);
router.get("/:id", PatientsController.getPatientsById);
router.put("/:id", PatientsController.updatePatients);
router.delete("/:id", PatientsController.deletePatients);

module.exports = router;
