const PatientServices = require("../services/patients.js");

const {
  ERROR500,
  PATIENT_UPDATED_SUCCESS,
  PATIENT_UPDATED_ERROR,
  PATIENT_DELETED_SUCCESS,
  PATIENT_DELETED_ERROR,
  PATIENT_GET_ERROR,
} = require("../constant/constant.js");

async function getAllPatients(req, res) {
  try {
    const patients = await PatientServices.getAllPatients();
    return res.status(200).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: ERROR500,
    });
  }
}

async function getPatientById(req, res) {
  try {
    const { id } = req.params;
    const patient = await PatientServices.getPatientById(id);
    if (patient.error) {
      return res.status(404).json({
        success: false,
        error: patient.error,
      });
    }
    return res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error(PATIENT_GET_ERROR, error);
    return res.status(500).json({
      success: false,
      error: ERROR500,
    });
  }
}

async function updatePatient(req, res) {
  try {
    const { id } = req.params;
    const { patientName, emailId, phonenumber, floor, isActive } = req.body;
    const updatedPatient = await PatientServices.updatePatient(id, {
      patientName,
      emailId,
      phonenumber,
      floor,
      isActive,
    });

    if (updatedPatient.error) {
      return res.status(400).json({
        success: false,
        error: updatedPatient.error,
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedPatient,
      message: PATIENT_UPDATED_SUCCESS,
    });
  } catch (error) {
    console.error(PATIENT_UPDATED_ERROR, error);
    return res.status(500).json({
      success: false,
      error: ERROR500,
    });
  }
}

async function deletePatient(req, res) {
  try {
    const { id } = req.params;
    const deletedPatient = await PatientServices.deletePatient(id);

    if (deletedPatient.error) {
      return res.status(400).json({
        success: false,
        error: deletedPatient.error,
      });
    }
    return res.status(200).json({
      success: true,
      message: PATIENT_DELETED_SUCCESS,
    });
  } catch (error) {
    console.error(PATIENT_DELETED_ERROR, error);
    return res.status(500).json({
      success: false,
      error: ERROR500,
    });
  }
}

module.exports = {
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
