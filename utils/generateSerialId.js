const Company = require('../models/Company');

async function generateSerialId({ compid, Model, prefixLetter }) {
  const company = await Company.findById(compid).select('com_name');
  if (!company) {
    throw new Error("Company not found");
  }

  const prefix = company.com_name.substring(0, 3).toUpperCase();

  const latestDoc = await Model.findOne({ compid })
    .sort({ serialNo: -1 })
    .select('serialNo');

  let nextSerial = 1;
  if (latestDoc && latestDoc.serialNo) {
    nextSerial = latestDoc.serialNo + 1;
  }

  const id = `${prefixLetter}-${prefix}${String(nextSerial).padStart(5, '0')}`;

  return { serialNo: nextSerial, id };
}
module.exports = generateSerialId;
