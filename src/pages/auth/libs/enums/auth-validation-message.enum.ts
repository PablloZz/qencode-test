const AuthValidationMessage = {
  NO_ERROR: "",
  PROVIDE_EMAIL: "Please provide an email.",
  PROVIDE_PASSWORD: "Please provide a password.",
  PROVIDE_ALL_FIELDS: "Please provide all the fields.",
  TOO_SHORT_PASSWORD:
    "Please provide a password that contain at least 8 characters.",
} as const;

export { AuthValidationMessage };
