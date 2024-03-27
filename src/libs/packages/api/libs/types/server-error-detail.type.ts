import {
  type ServerErrorDetailInfo,
  type ServerErrorDetailError,
} from "./types.ts";

type ServerErrorDetail =
  | ServerErrorDetailInfo[]
  | ServerErrorDetailError[]
  | string;

export { type ServerErrorDetail };
