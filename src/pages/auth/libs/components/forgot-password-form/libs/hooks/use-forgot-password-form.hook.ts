import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthValidationMessage,
  isEmailFilled,
  isFormFilled,
  isFormValid,
  isValidEmail,
} from "~/pages/auth/auth.tsx";
import { AppRoute } from "~/libs/enums/enums.ts";
import {
  ForgotPasswordFormErrors,
  ForgotPasswordFormValues,
} from "../types/types.ts";
import {
  INITIAL_FORGOT_PASSWORD_FORM_ERRORS,
  INITIAL_FORGOT_PASSWORD_FORM_VALUES,
} from "../constants/constants.ts";

function useForgotPasswordForm() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<ForgotPasswordFormValues>(
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

  function handleFormSubmit() {
    if (!isFormFilled<ForgotPasswordFormValues>(formValues)) {
      setFormErrors({ email: AuthValidationMessage.PROVIDE_EMAIL });
      return;
    }

    if (isFormValid<ForgotPasswordFormErrors>(formErrors)) {
      navigate(AppRoute.CREATE_NEW_PASSWORD);
    }
  }

  return {
    formValues,
    formErrors,
    handleChangeEmail,
    handleValidateEmail,
    handleFormSubmit,
  };
}

export { useForgotPasswordForm };
