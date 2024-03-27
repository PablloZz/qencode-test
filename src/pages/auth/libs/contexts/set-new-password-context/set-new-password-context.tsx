import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import {
  auth,
  type SetNewPasswordRequestDto,
  type SetNewPasswordResponseDto,
} from "~/packages/auth/auth.ts";
import { getErrorMessage } from "~/libs/helpers/helpers.ts";
import { type SetNewPasswordContext as TSetNewPasswordContext } from "./libs/types/types.ts";
import { AppRoute } from "~/libs/enums/app-route.enum.ts";

type Properties = {
  children: React.ReactNode;
};

const SetNewPasswordContext = createContext({} as TSetNewPasswordContext);

function SetNewPasswordProvider({ children }: Properties) {
  const navigate = useNavigate()
  const [setNewPasswordDetail, setSetNewPasswordDetail] =
    useState<SetNewPasswordResponseDto | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSetNewPassword(payload: SetNewPasswordRequestDto) {
    try {
      setLoading(true);
      const detail = await auth.setNewPassword(payload);
      alert(detail.detail);
      setSetNewPasswordDetail(detail);
      navigate(AppRoute.LOGIN);
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  const contextValue: TSetNewPasswordContext = {
    setNewPasswordDetail,
    loading,
    handleSetNewPassword,
  };

  return (
    <SetNewPasswordContext.Provider value={contextValue}>
      {children}
    </SetNewPasswordContext.Provider>
  );
}

function useSetNewPassword() {
  return useContext(SetNewPasswordContext);
}

export { SetNewPasswordProvider, useSetNewPassword };
