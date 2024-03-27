import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "~/libs/enums/enums.ts";
import { getErrorMessage } from "~/libs/helpers/helpers.ts";
import {
  auth,
  type ForgotPasswordRequestDto,
  type ForgotPasswordResponseDto,
} from "~/packages/auth/auth.ts";
import { type ForgotPasswordContext as TForgotPasswordContext } from "./libs/types/types.ts";

type Properties = {
  children: React.ReactNode;
};

const ForgotPasswordContext = createContext({} as TForgotPasswordContext);

function ForgotPasswordProvider({ children }: Properties) {
  const navigate = useNavigate();
  const [resetDetail, setResetDetails] =
    useState<ForgotPasswordResponseDto | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleResetPassword(payload: ForgotPasswordRequestDto) {
    try {
      setLoading(true);
      const detail = await auth.resetPassword(payload);
      alert(detail.detail);
      setResetDetails(detail);
      navigate(AppRoute.CREATE_NEW_PASSWORD);
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  const contextValue: TForgotPasswordContext = {
    resetDetail,
    loading,
    handleResetPassword,
  };

  return (
    <ForgotPasswordContext.Provider value={contextValue}>
      {children}
    </ForgotPasswordContext.Provider>
  );
}

function useForgotPassword() {
  return useContext(ForgotPasswordContext);
}

export { ForgotPasswordProvider, useForgotPassword };
