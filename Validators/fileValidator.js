const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
const maxFileSize = 5 * 1024 * 1024;

exports.validateFile = (file) => {
  if (!file) {
    return { isValid: false, message: "No file uploaded." };
  }

  if (!allowedFileTypes.includes(file.mimetype)) {
    return {
      isValid: false,
      message: "Invalid file type. Allowed: JPEG, PNG, PDF.",
    };
  }

  if (file.size > maxFileSize) {
    return { isValid: false, message: "File size exceeds 5MB limit." };
  }

  return { isValid: true, message: "File is valid." };
};
