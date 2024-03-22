import { useState } from "react";
import {
  AuthValidationMessage,
  isEmailFilled,
  isEnoughCharacters,
  isFormFilled,
  isProvideFieldsErrorExist,
  isValidEmail,
  shouldRemoveMinLengthError,
} from "~/pages/auth/auth.tsx";
import { type LoginFormErrors, type LoginFormValues } from "../types/types.ts";
import {
  INITIAL_LOGIN_FORM_ERRORS,
  INITIAL_LOGIN_FORM_VALUES,
} from "../constants/constants.ts";

function useLoginForm() {
  const [formValues, setFormValues] = useState<LoginFormValues>(
    INITIAL_LOGIN_FORM_VALUES
  );
  const [formErrors, setFormErrors] = useState<LoginFormErrors>(
    INITIAL_LOGIN_FORM_ERRORS
  );
  const [validEmail, setValidEmail] = useState(false);

  function handleShowPasswordField() {
    setValidEmail(true);
  }

  function handleResetErrors() {
    setFormErrors({
      emailError: AuthValidationMessage.NO_ERROR,
      passwordError: AuthValidationMessage.NO_ERROR,
    });
  }

  function handleChangeEmail(event: React.ChangeEvent) {
    const { value: email, validationMessage } =
      event.target as HTMLInputElement;

    if (isProvideFieldsErrorExist(formErrors.emailError)) {
      handleResetErrors();
    }

    if (isValidEmail(validationMessage, email)) {
      setFormErrors(previousErrors => ({
        ...previousErrors,
        emailError: AuthValidationMessage.NO_ERROR,
      }));
      handleShowPasswordField();
    }

    setFormValues(previousValues => ({ ...previousValues, email }));
  }

  function handleValidateEmail(event: React.FocusEvent<HTMLInputElement>) {
    const { email } = formValues;

    if (!isEmailFilled(email)) {
      setFormErrors(previousErrors => ({
        ...previousErrors,
        emailError: AuthValidationMessage.PROVIDE_EMAIL,
      }));
      return;
    }

    const { validationMessage: emailError } = event.target as HTMLInputElement;
    setFormErrors(previousErrors => ({ ...previousErrors, emailError }));
  }

  function handleChangePassword(event: React.ChangeEvent) {
    const { value: password } = event.target as HTMLInputElement;
    const { passwordError } = formErrors;

    if (isProvideFieldsErrorExist(formErrors.passwordError)) {
      handleResetErrors();
    }

    if (shouldRemoveMinLengthError(passwordError, password.length)) {
      setFormErrors(previousErrors => ({
        ...previousErrors,
        passwordError: AuthValidationMessage.NO_ERROR,
      }));
    }

    setFormValues(previousValues => ({ ...previousValues, password }));
  }

  function handleValidatePassword() {
    const { password } = formValues;

    if (!isEnoughCharacters(password.length)) {
      setFormErrors(previousValues => ({
        ...previousValues,
        passwordError: AuthValidationMessage.TOO_SHORT_PASSWORD,
      }));
    }
  }

  function handleFormSubmit() {
    if (!isFormFilled<LoginFormValues>(formValues)) {
      setFormErrors({
        emailError: AuthValidationMessage.PROVIDE_ALL_FIELDS,
        passwordError: AuthValidationMessage.PROVIDE_ALL_FIELDS,
      });

      return;
    }
  }

  return {
    formValues,
    formErrors,
    validEmail,
    handleChangeEmail,
    handleValidateEmail,
    handleChangePassword,
    handleValidatePassword,
    handleFormSubmit,
  };
}

export { useLoginForm };
