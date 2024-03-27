import { useState } from "react";
import {
  AuthValidationMessage,
  getEmptyFields,
  getErrorFields,
  getUpdatedFormErrors,
  isEnoughCharacters,
  isProvideFieldErrorExist,
  shouldRemoveMinLengthError,
} from "~/pages/auth/auth.tsx";
import { type SetNewPasswordRequestDto } from "~/packages/auth/auth.ts";
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
  const [formValues, setFormValues] = useState<CreateNewPasswordFormValues>(
    INITIAL_CREATE_NEW_PASSWORD_FORM_VALUES
  );
  const [formErrors, setFormErrors] = useState<CreateNewPasswordFormErrors>(
    INITIAL_CREATE_NEW_PASSWORD_FORM_ERRORS
  );

  function handleResetErrors() {
    setFormErrors({
      password: AuthValidationMessage.NO_ERROR,
      confirmPassword: AuthValidationMessage.NO_ERROR,
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
      passwordFieldType === "password" ? "password" : "confirmPassword";

    if (isProvideFieldErrorExist(errorMessage)) {
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
    const { password: passwordError } = formErrors;

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
        password: AuthValidationMessage.TOO_SHORT_PASSWORD,
      }));

      return;
    }

    if (shouldSetMismatchError(password, confirmPassword)) {
      setFormErrors({
        password: CreateNewPasswordFormValidationMessage.PASSWORDS_MISMATCH,
        confirmPassword:
          CreateNewPasswordFormValidationMessage.PASSWORDS_MISMATCH,
      });
    }
  }

  function handleChangeConfirmPassword(event: React.ChangeEvent) {
    const { value: confirmPassword } = event.target as HTMLInputElement;
    const { password } = formValues;
    const { confirmPassword: confirmPasswordError } = formErrors;

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
        confirmPassword: AuthValidationMessage.TOO_SHORT_PASSWORD,
      }));

      return;
    }

    if (shouldSetMismatchError(confirmPassword, password)) {
      setFormErrors({
        password: CreateNewPasswordFormValidationMessage.PASSWORDS_MISMATCH,
        confirmPassword:
          CreateNewPasswordFormValidationMessage.PASSWORDS_MISMATCH,
      });
    }
  }

  function handleFormSubmit(
    submitHandler: (payload: SetNewPasswordRequestDto) => void
  ) {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const emptyFields =
        getEmptyFields<CreateNewPasswordFormValues>(formValues);
      if (emptyFields.length) {
        setFormErrors(previousErrors => {
          return getUpdatedFormErrors<CreateNewPasswordFormErrors>(
            previousErrors,
            emptyFields
          );
        });

        return;
      }

      const errorFields =
        getErrorFields<CreateNewPasswordFormErrors>(formErrors);
      if (errorFields.length) {
        setFormErrors(previousErrors => {
          return getUpdatedFormErrors(previousErrors, errorFields);
        });

        return;
      }

      submitHandler({ password: formValues.password });
    };
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
