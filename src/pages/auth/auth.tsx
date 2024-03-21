import { useLocation } from "react-router-dom";
import {
  AuthLayout,
  CreateNewPasswordForm,
  ForgotPasswordForm,
  LoginForm,
  SignUpForm,
} from "./libs/components/components.ts";
import { AppRoute } from "~/libs/enums/enums.ts";

function Auth() {
  const { pathname } = useLocation();
  function getLayout(path: string) {
    switch (path) {
      case AppRoute.SIGN_UP: {
        return <SignUpForm />;
      }
      case AppRoute.LOGIN: {
        return <LoginForm />;
      }
      case AppRoute.FORGOT_PASSWORD: {
        return <ForgotPasswordForm />;
      }
      case AppRoute.CREATE_NEW_PASSWORD: {
        return <CreateNewPasswordForm />;
      }
    }
  }
  return <AuthLayout>{getLayout(pathname)}</AuthLayout>;
}

export { Auth };
