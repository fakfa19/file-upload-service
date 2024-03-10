require("dotenv").config();

// Function to check if file type is allowed
const allowedMimeType = (mimeType) => {
  const acceptFileTypes = process.env.ACCEPT_FILE_TYPES?.split(',') || [];
  return acceptFileTypes.includes(mimeType);
};

module.exports = { allowedMimeType };
