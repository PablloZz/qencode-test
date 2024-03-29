import { useLocation } from "react-router-dom";
import { AppRoute } from "~/libs/enums/enums.ts";
import {
  AuthLayout,
  CreateNewPasswordForm,
  ForgotPasswordForm,
  LoginForm,
  SignUpForm,
} from "./libs/components/components.ts";
import {
  ForgotPasswordProvider,
  LoginProvider,
  SetNewPasswordProvider,
} from "./libs/contexts/contexts.ts";

function Auth() {
  const { pathname } = useLocation();

  function getLayout(path: string) {
    switch (path) {
      case AppRoute.SIGN_UP: {
        return <SignUpForm />;
      }
      case AppRoute.LOGIN: {
        return (
          <LoginProvider>
            <LoginForm />
          </LoginProvider>
        );
      }
      case AppRoute.FORGOT_PASSWORD: {
        return (
          <ForgotPasswordProvider>
            <ForgotPasswordForm />
          </ForgotPasswordProvider>
        );
      }
      case AppRoute.CREATE_NEW_PASSWORD: {
        return (
          <SetNewPasswordProvider>
            <CreateNewPasswordForm />
          </SetNewPasswordProvider>
        );
      }
    }
  }
  return <AuthLayout>{getLayout(pathname)}</AuthLayout>;
}

export { Auth };
export { AuthValidationMessage } from "./libs/enums/enums.ts";
export {
  isValidEmail,
  isEmailFilled,
  getEmptyFields,
  getErrorFields,
  isEnoughCharacters,
  getUpdatedFormErrors,
  isProvideFieldErrorExist,
  shouldRemoveMinLengthError,
} from "./libs/helpers/helpers.ts";
export { EMPTY_FIELD } from "./libs/constants/constants.ts";
