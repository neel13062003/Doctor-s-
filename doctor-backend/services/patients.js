const { dbQueryAsync } = require("../helper/db");
const {
  PATIENTS_NOT_FOUND,
  ERROR500,
  PATIENTS_UPDATED_ERROR,
} = require("../constant/constant");

async function getAllPatients() {
  try {
    const Patients = await dbQueryAsync("SELECT * FROM Patients");
    return Patients;
  } catch (error) {
    console.error(PATIENTS_NOT_FOUND, error);
    throw new Error(PATIENTS_NOT_FOUND);
  }
}

async function getPatientsById(PatientsId) {
  try {
    const Patients = await dbQueryAsync(
      "SELECT * FROM Patients WHERE PatientsId = ?",
      [PatientsId]
    );
    if (Patients.length === 0) {
      return { error: PATIENTS_NOT_FOUND };
    }
    return Patients[0];
  } catch (error) {
    console.error(PATIENTS_NOT_FOUND, error);
    throw new Error(PATIENTS_NOT_FOUND);
  }
}

async function updatePatients(PatientsId, data) {
  try {
    const { PatientsName, emailId, phonenumber, floor, isActive } = data;
    const result = await dbQueryAsync(
      "UPDATE Patients SET PatientsName = ?, emailId = ?, phonenumber = ?, floor = ?,isActive=? WHERE PatientsId = ?",
      [PatientsName, emailId, phonenumber, floor, isActive, PatientsId]
    );
    if (result.affectedRows === 0) {
      return { error: PATIENTS_NOT_FOUND };
    }
    return { success: true };
  } catch (error) {
    console.error(PATIENTS_UPDATED_ERROR, error);
    throw new Error(PATIENTS_UPDATED_ERROR);
  }
}

async function deletePatients(PatientsId) {
  try {
    const result = await dbQueryAsync(
      "DELETE FROM Patients WHERE PatientsId = ?",
      [PatientsId]
    );
    if (result.affectedRows === 0) {
      return { error: PATIENTS_NOT_FOUND };
    }
    return { success: true };
  } catch (error) {
    console.error(ERROR500, error);
    throw new Error(ERROR500);
  }
}

module.exports = {
  getAllPatients,
  getPatientsById,
  updatePatients,
  deletePatients,
};
