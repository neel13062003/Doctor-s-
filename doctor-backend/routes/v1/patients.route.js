const express = require("express");
const PatientsController = require("../../controllers/patients");

const router = express.Router();

router.get("/", PatientsController.getAllPatients);
router.get("/:id", PatientsController.getPatientById);
router.post("/", PatientsController.createPatient);

router.put("/:id", PatientsController.updatePatient);
router.delete("/:id", PatientsController.deletePatient);

module.exports = router;
