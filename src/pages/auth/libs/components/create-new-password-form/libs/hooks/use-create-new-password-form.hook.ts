import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthValidationMessage,
  isEnoughCharacters,
  isFormFilled,
  isFormValid,
  isProvideFieldsErrorExist,
  shouldRemoveMinLengthError,
} from "~/pages/auth/auth.tsx";
import { AppRoute } from "~/libs/enums/enums.ts";
import {
  type HandleUpdatePasswordTypeErrors,
  type CreateNewPasswordFormErrors,
  type CreateNewPasswordFormValues,
} from "../types/types.ts";
import {
  INITIAL_CREATE_NEW_PASSWORD_FORM_ERRORS,
  INITIAL_CREATE_NEW_PASSWORD_FORM_VALUES,
} from "../constants/constants.ts";
import {
  shouldRemoveMismatchError,
  shouldSetMismatchError,
} from "../helpers/helpers.ts";
import { CreateNewPasswordFormValidationMessage } from "../enums/enums.ts";

function useCreateNewPasswordForm() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<CreateNewPasswordFormValues>(
    INITIAL_CREATE_NEW_PASSWORD_FORM_VALUES
  );
  const [formErrors, setFormErrors] = useState<CreateNewPasswordFormErrors>(
    INITIAL_CREATE_NEW_PASSWORD_FORM_ERRORS
  );

  function handleResetErrors() {
    setFormErrors({
      passwordError: AuthValidationMessage.NO_ERROR,
      confirmPasswordError: AuthValidationMessage.NO_ERROR,
    });
  }

  function handleUpdatePasswordTypeErrors({
    errorMessage,
    password,
    confirmPassword,
    passwordFieldType,
  }: HandleUpdatePasswordTypeErrors) {
    const currentFieldValue =
      passwordFieldType === "password" ? password : confirmPassword;
    const currentErrorFieldType: keyof CreateNewPasswordFormErrors =
      passwordFieldType === "password"
        ? "passwordError"
        : "confirmPasswordError";

    if (isProvideFieldsErrorExist(errorMessage)) {
      handleResetErrors();
    }

    if (shouldRemoveMinLengthError(errorMessage, currentFieldValue.length)) {
      setFormErrors(previousErrors => ({
        ...previousErrors,
        [currentErrorFieldType]: AuthValidationMessage.NO_ERROR,
      }));
    }

    if (shouldRemoveMismatchError(errorMessage, password, confirmPassword)) {
      handleResetErrors();
    }
  }

  function handleChangePassword(event: React.ChangeEvent) {
    const { value: password } = event.target as HTMLInputElement;
    const { confirmPassword } = formValues;
    const { passwordError } = formErrors;

    handleUpdatePasswordTypeErrors({
      confirmPassword,
      errorMessage: passwordError,
      password,
      passwordFieldType: "password",
    });

    setFormValues(previousValues => ({ ...previousValues, password }));
  }

  function handleValidatePassword() {
    const { password, confirmPassword } = formValues;

    if (!isEnoughCharacters(password.length)) {
      setFormErrors(previousValues => ({
        ...previousValues,
        passwordError: AuthValidationMessage.TOO_SHORT_PASSWORD,
      }));

      return;
    }

    if (shouldSetMismatchError(password, confirmPassword)) {
      setFormErrors({
        passwordError:
          CreateNewPasswordFormValidationMessage.PASSWORDS_MISMATCH,
        confirmPasswordError:
          CreateNewPasswordFormValidationMessage.PASSWORDS_MISMATCH,
      });
    }
  }

  function handleChangeConfirmPassword(event: React.ChangeEvent) {
    const { value: confirmPassword } = event.target as HTMLInputElement;
    const { password } = formValues;
    const { confirmPasswordError } = formErrors;

    handleUpdatePasswordTypeErrors({
      confirmPassword,
      errorMessage: confirmPasswordError,
      password,
      passwordFieldType: "confirmPassword",
    });

    setFormValues(previousValues => ({ ...previousValues, confirmPassword }));
  }

  function handleValidateConfirmPassword() {
    const { password, confirmPassword } = formValues;

    if (!isEnoughCharacters(confirmPassword.length)) {
      setFormErrors(previousValues => ({
        ...previousValues,
        confirmPasswordError: AuthValidationMessage.TOO_SHORT_PASSWORD,
      }));

      return;
    }

    if (shouldSetMismatchError(confirmPassword, password)) {
      setFormErrors({
        passwordError:
          CreateNewPasswordFormValidationMessage.PASSWORDS_MISMATCH,
        confirmPasswordError:
          CreateNewPasswordFormValidationMessage.PASSWORDS_MISMATCH,
      });
    }
  }

  function handleFormSubmit() {
    if (!isFormFilled<CreateNewPasswordFormValues>(formValues)) {
      setFormErrors({
        passwordError: AuthValidationMessage.PROVIDE_ALL_FIELDS,
        confirmPasswordError: AuthValidationMessage.PROVIDE_ALL_FIELDS,
      });

      return;
    }

    if (isFormValid<CreateNewPasswordFormErrors>(formErrors)) {
      navigate(AppRoute.LOGIN);
    }
  }

  return {
    formValues,
    formErrors,
    handleChangePassword,
    handleValidatePassword,
    handleChangeConfirmPassword,
    handleValidateConfirmPassword,
    handleFormSubmit,
  };
}

export { useCreateNewPasswordForm };