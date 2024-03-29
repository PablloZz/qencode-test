import { useState } from "react";
import {
  AuthValidationMessage,
  getEmptyFields,
  getErrorFields,
  getUpdatedFormErrors,
  isEmailFilled,
  isEnoughCharacters,
  isProvideFieldErrorExist,
  isValidEmail,
  shouldRemoveMinLengthError,
} from "~/pages/auth/auth.tsx";
import { type LoginRequestDto } from "~/packages/auth/auth.ts";
import { type LoginFormErrors } from "../types/types.ts";
import {
  INITIAL_LOGIN_FORM_ERRORS,
  INITIAL_LOGIN_FORM_VALUES,
} from "../constants/constants.ts";

function useLoginForm() {
  const [formValues, setFormValues] = useState<LoginRequestDto>(
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
      email: AuthValidationMessage.NO_ERROR,
      password: AuthValidationMessage.NO_ERROR,
    });
  }

  function handleChangeEmail(event: React.ChangeEvent) {
    const { value: email, validationMessage } =
      event.target as HTMLInputElement;
    const { email: emailError } = formErrors;

    if (isProvideFieldErrorExist(emailError)) {
      handleResetErrors();
    }

    if (isValidEmail(validationMessage, email)) {
      setFormErrors(previousErrors => ({
        ...previousErrors,
        email: AuthValidationMessage.NO_ERROR,
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
        email: AuthValidationMessage.PROVIDE_EMAIL,
      }));
      return;
    }

    const { validationMessage: emailError } = event.target as HTMLInputElement;
    setFormErrors(previousErrors => ({ ...previousErrors, email: emailError }));
  }

  function handleChangePassword(event: React.ChangeEvent) {
    const { value: password } = event.target as HTMLInputElement;
    const { password: passwordError } = formErrors;

    if (isProvideFieldErrorExist(passwordError)) {
      handleResetErrors();
    }

    if (shouldRemoveMinLengthError(passwordError, password.length)) {
      setFormErrors(previousErrors => ({
        ...previousErrors,
        password: AuthValidationMessage.NO_ERROR,
      }));
    }

    setFormValues(previousValues => ({ ...previousValues, password }));
  }

  function handleValidatePassword() {
    const { password } = formValues;

    if (!isEnoughCharacters(password.length)) {
      setFormErrors(previousValues => ({
        ...previousValues,
        password: AuthValidationMessage.TOO_SHORT_PASSWORD,
      }));
    }
  }

  function handleFormSubmit(
    submitHandler: (payload: LoginRequestDto) => Promise<void>
  ) {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const emptyFields = getEmptyFields<LoginRequestDto>(formValues);
      if (emptyFields.length) {
        setFormErrors(previousErrors => {
          return getUpdatedFormErrors<LoginFormErrors>(
            previousErrors,
            emptyFields
          );
        });

        return;
      }

      const errorFields = getErrorFields<LoginFormErrors>(formErrors);
      if (errorFields.length) {
        setFormErrors(previousErrors => {
          return getUpdatedFormErrors<LoginFormErrors>(
            previousErrors,
            errorFields
          );
        });

        return;
      }

      submitHandler(formValues);
    };
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
