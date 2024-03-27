import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthValidationMessage,
  getEmptyFields,
  getErrorFields,
  isEmailFilled,
  isValidEmail,
} from "~/pages/auth/auth.tsx";
import { AppRoute } from "~/libs/enums/enums.ts";
import { type ForgotPasswordRequestDto } from "~/packages/auth/auth.ts";
import { type ForgotPasswordFormErrors } from "../types/types.ts";
import {
  INITIAL_FORGOT_PASSWORD_FORM_ERRORS,
  INITIAL_FORGOT_PASSWORD_FORM_VALUES,
} from "../constants/constants.ts";

function useForgotPasswordForm() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<ForgotPasswordRequestDto>(
    INITIAL_FORGOT_PASSWORD_FORM_VALUES
  );
  const [formErrors, setFormErrors] = useState<ForgotPasswordFormErrors>(
    INITIAL_FORGOT_PASSWORD_FORM_ERRORS
  );

  function handleChangeEmail(event: React.ChangeEvent) {
    const { value: email, validationMessage } =
      event.target as HTMLInputElement;

    if (isValidEmail(validationMessage, email)) {
      setFormErrors({ email: AuthValidationMessage.NO_ERROR });
    }

    setFormValues({ email });
  }

  function handleValidateEmail(event: React.FocusEvent<HTMLInputElement>) {
    const { email } = formValues;

    if (!isEmailFilled(email)) {
      setFormErrors({ email: AuthValidationMessage.PROVIDE_EMAIL });
      return;
    }

    const { validationMessage: emailError } = event.target as HTMLInputElement;
    setFormErrors({ email: emailError });
  }

  function handleCancelResetPassword() {
    navigate(AppRoute.LOGIN);
  }

  function handleFormSubmit(
    submitHandler: (payload: ForgotPasswordRequestDto) => void
  ) {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const emptyFields = getEmptyFields<ForgotPasswordRequestDto>(formValues);
      if (emptyFields.length) {
        setFormErrors({ email: AuthValidationMessage.PROVIDE_EMAIL });
        return;
      }

      const errorFields = getErrorFields<ForgotPasswordFormErrors>(formErrors);
      if (!errorFields.length) {
        submitHandler(formValues);
      }
    };
  }

  return {
    formValues,
    formErrors,
    handleFormSubmit,
    handleChangeEmail,
    handleValidateEmail,
    handleCancelResetPassword,
  };
}

export { useForgotPasswordForm };
